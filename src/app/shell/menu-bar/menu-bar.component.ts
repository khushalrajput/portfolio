import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  template: `
    <div class="menu-bar">
      @for (item of menuItems; track item) {
        <button class="menu-item">{{ item }}</button>
      }
    </div>
  `,
  styles: [`
    .menu-bar {
      display: flex;
      align-items: center;
      height: 30px;
      background-color: var(--vsc-bg-titlebar);
      padding: 0 8px;
      gap: 0;
      border-bottom: 1px solid var(--vsc-border);
    }

    .menu-item {
      padding: 4px 8px;
      color: var(--vsc-text-muted);
      background: transparent;
      border: none;
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--vsc-text-primary);
      }
    }
  `],
})
export class MenuBarComponent {
  readonly menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];
}
