import { Component, Input } from '@angular/core';

import { SidebarComponent as BaseSidebarComponent } from 'theme/components/sidebar';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['../../../theme/components/sidebar/sidebar.component.scss', './sidebar.component.scss'],
  templateUrl: '../../../theme/components/sidebar/sidebar.component.html',
})
export class SidebarComponent extends BaseSidebarComponent {
  public title = 'darkboard';
  public menu = [
    { name: 'Dashboard', link: '/app/dashboard', icon: 'dashboard' },
    { name: 'Projekty', link: '/ui/projects', icon: 'view_quilt' },
    // {
    //   name: 'UI',
    //   children: [
    //     {
    //       name: 'Projekty',
    //       link: '/ui/projects',
    //     },
    //     ...[
          
    //       'buttons',
    //       'cards',
    //       'colors',
    //       'forms',
    //       'icons',
    //       'typography',
    //       'tables',
    //     ].map(ui => ({
    //       name: ui[0].toUpperCase() + ui.slice(1),
    //       link: `/ui/${ui}`,
    //     })),
    //     {
    //       name: 'Right sidebar',
    //       link: '/ui/right-sidebar',
    //     },
    //   ],
    //   icon: 'view_comfy',
    // },
    { name: 'Dokumentacja', link: '/ui/documentation', icon: 'developer_board' },
    // { name: 'Konto', link: '/app/forms', icon: 'person' },
    // {
    //   name: 'Maps', icon: 'map', children: [
    //   { name: 'Simple map', link: '/maps/simple' },
    //   { name: 'Advanced map', link: '/maps/advanced' },
    //   ],
    // },
    { name: 'Statystyki', link: '/app/charts', icon: 'multiline_chart' },
    {
      name: 'Strony', children: [
      { name: 'Logowanie', link: '/pages/login' },
      { name: 'Rejestracja', link: '/pages/sign-up' },
      { name: '404', link: '/pages/error' },
      ],
      icon: 'pages',
    },
  ];
}
