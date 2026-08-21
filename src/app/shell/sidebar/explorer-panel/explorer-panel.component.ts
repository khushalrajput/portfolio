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

        &.p-tree-node-content-selected {
          background: var(--vsc-bg-selection) !important;
        }
      }

      .p-tree-toggler {
        color: var(--vsc-text-muted) !important;
        width: 16px !important;
        height: 16px !important;
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
      icon: node.type === 'folder' ? 'pi pi-folder' : this.getFileIcon(node.fileExtension),
      expandedIcon: node.type === 'folder' ? 'pi pi-folder-open' : undefined,
      collapsedIcon: node.type === 'folder' ? 'pi pi-folder' : undefined,
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

  private getFileIcon(ext?: string): string {
    const iconMap: Record<string, string> = {
      ts: 'pi pi-file',
      html: 'pi pi-file',
      scss: 'pi pi-file',
      json: 'pi pi-file',
      md: 'pi pi-file',
      pdf: 'pi pi-file',
    };
    return iconMap[ext ?? ''] ?? 'pi pi-file';
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
