import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './core/services/sidebar.service';
import { TitleBarComponent } from './shell/title-bar/title-bar.component';
import { MenuBarComponent } from './shell/menu-bar/menu-bar.component';
import { ActivityBarComponent } from './shell/activity-bar/activity-bar.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { TabBarComponent } from './shell/tab-bar/tab-bar.component';
import { BreadcrumbComponent } from './shell/breadcrumb/breadcrumb.component';
import { TerminalPaneComponent } from './shell/terminal-pane/terminal-pane.component';
import { StatusBarComponent } from './shell/status-bar/status-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TitleBarComponent,
    MenuBarComponent,
    ActivityBarComponent,
    SidebarComponent,
    TabBarComponent,
    BreadcrumbComponent,
    TerminalPaneComponent,
    StatusBarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(protected readonly sidebarService: SidebarService) {}
}
