import { Injectable, signal, computed } from '@angular/core';

export type SidebarPanel = 'explorer' | 'search' | 'git' | 'skills' | null;

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly _activePanel = signal<SidebarPanel>('explorer');
  private readonly _copilotOpen = signal(false);

  readonly activePanel = this._activePanel.asReadonly();
  readonly isOpen = computed(() => this._activePanel() !== null);
  readonly copilotOpen = this._copilotOpen.asReadonly();

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

  toggleCopilot(): void {
    this._copilotOpen.update((v) => !v);
  }

  closeCopilot(): void {
    this._copilotOpen.set(false);
  }
}
