import { Injectable, signal, computed } from '@angular/core';

export type SidebarPanel = 'explorer' | 'git' | 'skills' | 'copilot' | null;

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly _activePanel = signal<SidebarPanel>('explorer');

  readonly activePanel = this._activePanel.asReadonly();
  readonly isOpen = computed(() => this._activePanel() !== null);

  togglePanel(panel: SidebarPanel): void {
    if (this._activePanel() === panel) {
      this._activePanel.set(null);
    } else {
      this._activePanel.set(panel);
    }
  }

  closePanel(): void {
    this._activePanel.set(null);
  }
}
