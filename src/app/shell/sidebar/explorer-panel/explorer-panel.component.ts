import { Component, OnInit } from '@angular/core';
import { Tree } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { TabService } from '../../../core/services/tab.service';
import { FileTreeNode, TabItem } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-explorer-panel',
  imports: [Tree],
  template: `
    <div class="explorer-panel">
      <div class="panel-header">EXPLORER</div>
      <p-tree
        [value]="treeNodes"
        selectionMode="single"
        (onNodeSelect)="onNodeSelect($event)"
        [style]="{ border: 'none', background: 'transparent', padding: '0', width: '100%' }"
      />
    </div>
  `,
  styles: [`
    .explorer-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;
    }

    .panel-header {
      padding: 8px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--vsc-text-muted);
    }

    :host ::ng-deep {
      .p-tree {
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        color: var(--vsc-text-primary) !important;
        font-size: 13px !important;
        font-family: 'Cascadia Code', monospace !important;
      }

      .p-tree-node-label {
        color: var(--vsc-text-primary) !important;
        font-size: 13px !important;
      }

      .p-tree-node-content {
        padding: 1px 8px !important;
        border-radius: 0 !important;

        &:hover {
          background: var(--vsc-bg-hover) !important;
        }

        &.p-tree-node-content-selected,
        &.p-highlight {
          background: var(--vsc-bg-selection) !important;
          outline: 1px solid rgba(0, 122, 204, 0.5) !important;
        }

        &.p-tree-node-content-selected .p-tree-node-label,
        &.p-highlight .p-tree-node-label {
          color: var(--vsc-text-active) !important;
        }
      }

      .p-tree-toggler {
        color: var(--vsc-text-muted) !important;
        width: 16px !important;
        height: 16px !important;
      }

      /* Hide the generic pi-file icon for file nodes that have a custom ext class */
      .file-ext-ts,
      .file-ext-html,
      .file-ext-scss,
      .file-ext-json,
      .file-ext-md,
      .file-ext-pdf,
      .file-ext-git-timeline {
        .p-tree-node-icon {
          font-size: 0 !important;
          width: 20px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;

          &::before {
            font-family: 'Cascadia Code', monospace !important;
            font-weight: 700 !important;
            font-size: 9px !important;
            line-height: 1 !important;
            border-radius: 2px !important;
            padding: 1px 2px !important;
            letter-spacing: -0.5px !important;
          }
        }
      }

      .file-ext-ts .p-tree-node-icon::before {
        content: 'TS' !important;
        color: #3178c6 !important;
        border: 1px solid #3178c6 !important;
      }

      .file-ext-html .p-tree-node-icon::before {
        content: '<>' !important;
        color: #e34c26 !important;
        border: 1px solid #e34c26 !important;
      }

      .file-ext-scss .p-tree-node-icon::before {
        content: 'S' !important;
        color: #cd6799 !important;
        border: 1px solid #cd6799 !important;
      }

      .file-ext-json .p-tree-node-icon::before {
        content: '{}' !important;
        color: #cbcb41 !important;
        border: 1px solid #cbcb41 !important;
      }

      .file-ext-md .p-tree-node-icon::before {
        content: 'M↓' !important;
        color: #519aba !important;
        border: 1px solid #519aba !important;
      }

      .file-ext-pdf .p-tree-node-icon::before {
        content: 'PDF' !important;
        color: #e44d26 !important;
        border: 1px solid #e44d26 !important;
        font-size: 7px !important;
      }

      .file-ext-git-timeline .p-tree-node-icon::before {
        content: '⎇' !important;
        color: #f05032 !important;
        border: 1px solid #f05032 !important;
      }
    }
  `],
})
export class ExplorerPanelComponent implements OnInit {
  treeNodes: TreeNode[] = [];

  constructor(
    private readonly dataService: PortfolioDataService,
    private readonly tabService: TabService,
  ) {}

  ngOnInit(): void {
    this.treeNodes = this.mapToTreeNodes(this.dataService.fileTree);
  }

  onNodeSelect(event: { node: TreeNode }): void {
    const node = event.node;
    if (node.data?.route) {
      const tab: TabItem = {
        id: node.data.route.replace('/', ''),
        label: node.label ?? '',
        icon: node.data.icon ?? 'file',
        route: node.data.route,
        fileExtension: node.data.fileExtension ?? '',
        isModified: false,
        breadcrumb: this.buildBreadcrumb(node),
      };
      this.tabService.openTab(tab);
    }
  }

  private mapToTreeNodes(nodes: FileTreeNode[]): TreeNode[] {
    return nodes.map((node) => ({
      label: node.label,
      icon: node.type === 'folder' ? 'pi pi-folder' : 'pi pi-file',
      expandedIcon: node.type === 'folder' ? 'pi pi-folder-open' : undefined,
      collapsedIcon: node.type === 'folder' ? 'pi pi-folder' : undefined,
      styleClass: node.type === 'file' ? this.getFileStyleClass(node.fileExtension) : undefined,
      children: node.children ? this.mapToTreeNodes(node.children) : undefined,
      leaf: node.type === 'file',
      expanded: node.label === 'PORTFOLIO' || node.label === 'src',
      data: {
        route: node.route,
        icon: node.icon,
        fileExtension: node.fileExtension,
        type: node.type,
      },
    }));
  }

  private getFileStyleClass(ext?: string): string {
    const classMap: Record<string, string> = {
      ts: 'file-ext-ts',
      html: 'file-ext-html',
      scss: 'file-ext-scss',
      json: 'file-ext-json',
      md: 'file-ext-md',
      pdf: 'file-ext-pdf',
      'git-timeline': 'file-ext-git-timeline',
    };
    return classMap[ext ?? ''] ?? 'file-ext-default';
  }

  private buildBreadcrumb(node: TreeNode): string[] {
    const parts: string[] = [];
    let current: TreeNode | undefined = node;
    while (current) {
      if (current.label) parts.unshift(current.label);
      current = current.parent;
    }
    return parts;
  }
}
