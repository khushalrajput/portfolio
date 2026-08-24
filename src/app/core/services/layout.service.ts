import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly _terminalCollapsed = signal(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );
  private readonly _commandPaletteOpen = signal(false);

  readonly terminalCollapsed = this._terminalCollapsed.asReadonly();
  readonly commandPaletteOpen = this._commandPaletteOpen.asReadonly();

  toggleTerminal(): void {
    this._terminalCollapsed.update((v) => !v);
  }

  openCommandPalette(): void {
    this._commandPaletteOpen.set(true);
  }

  closeCommandPalette(): void {
    this._commandPaletteOpen.set(false);
  }

  toggleCommandPalette(): void {
    this._commandPaletteOpen.update((v) => !v);
  }
}
