import { Component, HostBinding } from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['../charts/charts.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends UpgradableComponent {
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') private readonly mdlGridNoSpacing = true;

  constructor(private route: Router) {
    super();
  }

  goToWorkTime() {
    this.route.navigate(['ui/work-time/']);
  }
}


