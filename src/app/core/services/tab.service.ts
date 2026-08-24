import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TabItem } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class TabService {
  private readonly _tabs = signal<TabItem[]>([
    {
      id: 'readme',
      label: 'readme.md',
      icon: 'markdown',
      route: '/readme',
      fileExtension: 'md',
      isModified: false,
      breadcrumb: ['PORTFOLIO', 'readme.md'],
    },
    {
      id: 'about',
      label: 'about-me.scss',
      icon: 'scss',
      route: '/about',
      fileExtension: 'scss',
      isModified: true,
      breadcrumb: ['PORTFOLIO', 'src', 'app', 'portfolio', 'about-me.scss'],
    },
  ]);

  private readonly _activeTabId = signal<string>('readme');

  readonly tabs = this._tabs.asReadonly();
  readonly activeTabId = this._activeTabId.asReadonly();
  readonly activeTab = computed(() =>
    this._tabs().find((t) => t.id === this._activeTabId())
  );

  constructor(private readonly router: Router) {}

  openTab(tab: TabItem): void {
    const existing = this._tabs().find((t) => t.id === tab.id);
    if (!existing) {
      this._tabs.update((tabs) => [...tabs, tab]);
    }
    this._activeTabId.set(tab.id);
    this.router.navigate([tab.route]);
  }

  closeTab(tabId: string): void {
    const tabs = this._tabs();
    if (tabs.length <= 1) return; // keep at least one tab open

    const index = tabs.findIndex((t) => t.id === tabId);
    if (index === -1) return;

    this._tabs.update((t) => t.filter((tab) => tab.id !== tabId));

    if (this._activeTabId() === tabId) {
      const remaining = this._tabs();
      const newIndex = Math.min(index, remaining.length - 1);
      this._activeTabId.set(remaining[newIndex].id);
      this.router.navigate([remaining[newIndex].route]);
    }
  }

  activateTab(tabId: string): void {
    const tab = this._tabs().find((t) => t.id === tabId);
    if (tab) {
      this._activeTabId.set(tabId);
      this.router.navigate([tab.route]);
    }
  }

  activateByRoute(route: string): void {
    const tab = this._tabs().find((t) => t.route === route);
    if (tab) {
      this._activeTabId.set(tab.id);
    }
  }
}
