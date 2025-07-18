// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

declare const AmCharts: any;

interface MenuItem {
  title: string;
  description: string;
  icon: string;
  route: string;
}

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      title: 'Employee Registration',
      description: 'Register the employees to the system',
      icon: '👨‍🏫',
      route: '/registration/employee-registration'
    },
    {
      title: 'Customer Registration',
      description: 'Register Customers to the system',
      icon: '👨‍🏫',
      route: '/registration/customer-registration'
    },
    {
      title: 'Supplier Registraton',
      description: 'Register Suppliers to the system',
      icon: '👨‍🏫',
      route: '/registration/supplier-registration'
    },
    {
      title: 'Employee Reports',
      description: 'Get Employees List',
      icon: '📚',
      route: '/reports/employee-list'
    },
    {
      title: 'Customer Reports',
      description: 'Get Customers List',
      icon: '📚',
      route: '/reports/customer-report'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToSection(route: string) {
    this.router.navigate([route]);
  }
}
