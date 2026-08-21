import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'syntaxHighlight' })
export class SyntaxHighlightPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(code: string, language: string = 'typescript'): SafeHtml {
    let html = this.escapeHtml(code);

    if (language === 'typescript' || language === 'ts') {
      html = this.highlightTypeScript(html);
    } else if (language === 'html') {
      html = this.highlightHtml(html);
    } else if (language === 'scss' || language === 'css') {
      html = this.highlightScss(html);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private highlightTypeScript(html: string): string {
    // Comments
    html = html.replace(/(\/\/.*$)/gm, '<span class="syn-comment">$1</span>');
    // Strings
    html = html.replace(/(&apos;[^&apos;]*&apos;|&#39;[^&#39;]*&#39;|'[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="syn-string">$1</span>');
    // Keywords
    const keywords = ['const', 'let', 'var', 'import', 'export', 'from', 'return', 'if', 'else', 'function', 'class', 'interface', 'type', 'extends', 'implements', 'new', 'this', 'async', 'await', 'readonly', 'private', 'protected', 'public'];
    for (const kw of keywords) {
      html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span class="syn-keyword">$1</span>');
    }
    // Types
    const types = ['string', 'number', 'boolean', 'void', 'null', 'undefined', 'any', 'never', 'unknown'];
    for (const t of types) {
      html = html.replace(new RegExp(`\\b(${t})\\b`, 'g'), '<span class="syn-type">$1</span>');
    }
    // Decorators
    html = html.replace(/(@\w+)/g, '<span class="syn-decorator">$1</span>');
    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="syn-number">$1</span>');
    return html;
  }

  private highlightHtml(html: string): string {
    html = html.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="syn-tag">$2</span>');
    html = html.replace(/([\w-]+)(=)/g, '<span class="syn-attribute">$1</span>$2');
    html = html.replace(/(".*?")/g, '<span class="syn-string">$1</span>');
    return html;
  }

  private highlightScss(html: string): string {
    html = html.replace(/(\/\/.*$)/gm, '<span class="syn-comment">$1</span>');
    html = html.replace(/(\.[a-zA-Z][\w-]*)/g, '<span class="syn-selector">$1</span>');
    html = html.replace(/(#[a-fA-F0-9]{3,8})\b/g, '<span class="syn-number">$1</span>');
    html = html.replace(/(@\w+)/g, '<span class="syn-keyword">$1</span>');
    html = html.replace(/(:\s*)([^;{}\n]+)(;)/g, '$1<span class="syn-value">$2</span>$3');
    return html;
  }
}
