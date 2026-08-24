import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarService } from './core/services/sidebar.service';
import { TabService } from './core/services/tab.service';
import { TitleBarComponent } from './shell/title-bar/title-bar.component';
import { MenuBarComponent } from './shell/menu-bar/menu-bar.component';
import { ActivityBarComponent } from './shell/activity-bar/activity-bar.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { TabBarComponent } from './shell/tab-bar/tab-bar.component';
import { BreadcrumbComponent } from './shell/breadcrumb/breadcrumb.component';
import { TerminalPaneComponent } from './shell/terminal-pane/terminal-pane.component';
import { StatusBarComponent } from './shell/status-bar/status-bar.component';
import { CopilotChatPanelComponent } from './shell/sidebar/copilot-chat-panel/copilot-chat-panel.component';
import { CommandPaletteComponent } from './shell/command-palette/command-palette.component';

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
    CopilotChatPanelComponent,
    CommandPaletteComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(
    protected readonly sidebarService: SidebarService,
    private readonly router: Router,
    private readonly tabService: TabService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.tabService.activateByRoute(url);
      });
  }
}
