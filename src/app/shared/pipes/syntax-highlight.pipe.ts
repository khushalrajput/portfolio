import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Token {
  type: 'keyword' | 'string' | 'comment' | 'type' | 'number' | 'decorator' | 'tag' | 'attribute' | 'selector' | 'value' | 'text';
  value: string;
}

@Pipe({ name: 'syntaxHighlight' })
export class SyntaxHighlightPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(code: string, language: string = 'typescript'): SafeHtml {
    let html: string;

    if (language === 'typescript' || language === 'ts') {
      html = this.tokenizeTypeScript(code);
    } else if (language === 'html') {
      html = this.tokenizeHtml(code);
    } else if (language === 'scss' || language === 'css') {
      html = this.tokenizeScss(code);
    } else {
      html = this.escapeHtml(code);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private wrapSpan(cls: string, text: string): string {
    return `<span class="${cls}">${this.escapeHtml(text)}</span>`;
  }

  private tokenizeTypeScript(code: string): string {
    const keywords = new Set(['const', 'let', 'var', 'import', 'export', 'from', 'return', 'if', 'else', 'function', 'class', 'interface', 'type', 'extends', 'implements', 'new', 'this', 'async', 'await', 'readonly', 'private', 'protected', 'public', 'default']);
    const types = new Set(['string', 'number', 'boolean', 'void', 'null', 'undefined', 'any', 'never', 'unknown']);

    const result: string[] = [];
    let i = 0;

    while (i < code.length) {
      // Single-line comment
      if (code[i] === '/' && code[i + 1] === '/') {
        const end = code.indexOf('\n', i);
        const commentEnd = end === -1 ? code.length : end;
        result.push(this.wrapSpan('syn-comment', code.slice(i, commentEnd)));
        i = commentEnd;
        continue;
      }

      // Decorator
      if (code[i] === '@' && /[a-zA-Z]/.test(code[i + 1] || '')) {
        let j = i + 1;
        while (j < code.length && /\w/.test(code[j])) j++;
        result.push(this.wrapSpan('syn-decorator', code.slice(i, j)));
        i = j;
        continue;
      }

      // String (single quote)
      if (code[i] === "'") {
        let j = i + 1;
        while (j < code.length && code[j] !== "'" && code[j] !== '\n') {
          if (code[j] === '\\') j++;
          j++;
        }
        if (j < code.length) j++;
        result.push(this.wrapSpan('syn-string', code.slice(i, j)));
        i = j;
        continue;
      }

      // String (double quote)
      if (code[i] === '"') {
        let j = i + 1;
        while (j < code.length && code[j] !== '"' && code[j] !== '\n') {
          if (code[j] === '\\') j++;
          j++;
        }
        if (j < code.length) j++;
        result.push(this.wrapSpan('syn-string', code.slice(i, j)));
        i = j;
        continue;
      }

      // Template literal
      if (code[i] === '`') {
        let j = i + 1;
        while (j < code.length && code[j] !== '`') {
          if (code[j] === '\\') j++;
          j++;
        }
        if (j < code.length) j++;
        result.push(this.wrapSpan('syn-string', code.slice(i, j)));
        i = j;
        continue;
      }

      // Number
      if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
        let j = i;
        while (j < code.length && /[\d.]/.test(code[j])) j++;
        result.push(this.wrapSpan('syn-number', code.slice(i, j)));
        i = j;
        continue;
      }

      // Word (keyword, type, or identifier)
      if (/[a-zA-Z_$]/.test(code[i])) {
        let j = i;
        while (j < code.length && /\w/.test(code[j])) j++;
        const word = code.slice(i, j);
        if (keywords.has(word)) {
          result.push(this.wrapSpan('syn-keyword', word));
        } else if (types.has(word)) {
          result.push(this.wrapSpan('syn-type', word));
        } else {
          result.push(this.escapeHtml(word));
        }
        i = j;
        continue;
      }

      // Other character
      result.push(this.escapeHtml(code[i]));
      i++;
    }

    return result.join('');
  }

  private tokenizeHtml(code: string): string {
    const result: string[] = [];
    let i = 0;

    while (i < code.length) {
      // Comment
      if (code.startsWith('<!--', i)) {
        const end = code.indexOf('-->', i);
        const commentEnd = end === -1 ? code.length : end + 3;
        result.push(this.wrapSpan('syn-comment', code.slice(i, commentEnd)));
        i = commentEnd;
        continue;
      }

      // Tag
      if (code[i] === '<') {
        let j = i + 1;
        const isClosing = code[j] === '/';
        if (isClosing) j++;

        // Tag name
        let tagStart = j;
        while (j < code.length && /[\w-]/.test(code[j])) j++;
        const tagName = code.slice(tagStart, j);

        result.push(this.escapeHtml(code.slice(i, tagStart)));
        if (tagName) {
          result.push(this.wrapSpan('syn-tag', tagName));
        }

        // Attributes until >
        while (j < code.length && code[j] !== '>') {
          if (/[a-zA-Z[\]]/.test(code[j])) {
            let attrStart = j;
            while (j < code.length && code[j] !== '=' && code[j] !== '>' && code[j] !== ' ' && code[j] !== '\n') j++;
            result.push(this.wrapSpan('syn-attribute', code.slice(attrStart, j)));
          } else if (code[j] === '"') {
            let strStart = j;
            j++;
            while (j < code.length && code[j] !== '"') j++;
            if (j < code.length) j++;
            result.push(this.wrapSpan('syn-string', code.slice(strStart, j)));
          } else {
            result.push(this.escapeHtml(code[j]));
            j++;
          }
        }

        if (j < code.length) {
          result.push(this.escapeHtml(code[j]));
          j++;
        }
        i = j;
        continue;
      }

      result.push(this.escapeHtml(code[i]));
      i++;
    }

    return result.join('');
  }

  private tokenizeScss(code: string): string {
    const result: string[] = [];
    let i = 0;

    while (i < code.length) {
      // Comment
      if (code[i] === '/' && code[i + 1] === '/') {
        const end = code.indexOf('\n', i);
        const commentEnd = end === -1 ? code.length : end;
        result.push(this.wrapSpan('syn-comment', code.slice(i, commentEnd)));
        i = commentEnd;
        continue;
      }

      // @ rule
      if (code[i] === '@' && /[a-zA-Z]/.test(code[i + 1] || '')) {
        let j = i + 1;
        while (j < code.length && /\w/.test(code[j])) j++;
        result.push(this.wrapSpan('syn-keyword', code.slice(i, j)));
        i = j;
        continue;
      }

      // Class selector
      if (code[i] === '.' && /[a-zA-Z]/.test(code[i + 1] || '') && (i === 0 || /[\s{;,}]/.test(code[i - 1]))) {
        let j = i + 1;
        while (j < code.length && /[\w-]/.test(code[j])) j++;
        result.push(this.wrapSpan('syn-selector', code.slice(i, j)));
        i = j;
        continue;
      }

      // Hex color
      if (code[i] === '#' && /[a-fA-F0-9]/.test(code[i + 1] || '')) {
        let j = i + 1;
        while (j < code.length && /[a-fA-F0-9]/.test(code[j])) j++;
        result.push(this.wrapSpan('syn-number', code.slice(i, j)));
        i = j;
        continue;
      }

      // String
      if (code[i] === "'" || code[i] === '"') {
        const quote = code[i];
        let j = i + 1;
        while (j < code.length && code[j] !== quote && code[j] !== '\n') j++;
        if (j < code.length) j++;
        result.push(this.wrapSpan('syn-string', code.slice(i, j)));
        i = j;
        continue;
      }

      // Number
      if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
        let j = i;
        while (j < code.length && /[\d.%pxemremvhvw]/.test(code[j])) j++;
        result.push(this.wrapSpan('syn-number', code.slice(i, j)));
        i = j;
        continue;
      }

      result.push(this.escapeHtml(code[i]));
      i++;
    }

    return result.join('');
  }
}
