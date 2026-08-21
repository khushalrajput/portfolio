import { Component, computed } from '@angular/core';
import { TabService } from '../../core/services/tab.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div class="breadcrumb">
      @for (segment of segments(); track $index; let last = $last) {
        <span class="breadcrumb-item" [class.active]="last">{{ segment }}</span>
        @if (!last) {
          <span class="breadcrumb-separator">›</span>
        }
      }
    </div>
  `,
  styles: [`
    .breadcrumb {
      display: flex;
      align-items: center;
      height: 22px;
      padding: 0 12px;
      background-color: var(--vsc-bg-editor);
      font-size: 11px;
      overflow: hidden;
    }

    .breadcrumb-item {
      color: var(--vsc-text-muted);
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: var(--vsc-text-primary);
      }

      &.active {
        color: var(--vsc-text-primary);
      }
    }

    .breadcrumb-separator {
      color: var(--vsc-text-muted);
      margin: 0 4px;
    }
  `],
})
export class BreadcrumbComponent {
  constructor(private readonly tabService: TabService) {}

  readonly segments = computed(() => {
    const tab = this.tabService.activeTab();
    return tab?.breadcrumb ?? [];
  });
}
