// angular import
import { Component, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexResponsive,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexGrid
} from 'ng-apexcharts';
import { CommonDataServiceService } from 'src/app/services/common-data-service/common-data-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  colors: string[];
  labels: string[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export default class ApexChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  monthlySalesChartOptions: any = {};
  monthlySalesIncomeChartOptions: any = {};
  weeklyOrdersbyStatus: any = {};
  salesIncomePerItemChartOptions: any = {};

  constructor(private commonDataService: CommonDataServiceService, private messageService: MessageServiceService) {
    this.getMonthlySalesData();
    this.getMonthlySalesIncome();
    this.getNoOfOrdersPlaceThisWeekByStatus();
    this.getSalesPerOrderItem();
  }

  public getMonthlySalesData(): void {
    this.commonDataService.getMonthlySalesData().subscribe({
      next: (response: any) => {
        this.updateMonthlySalesChart(response);
      },
      error: (error: any) => {
        this.messageService.showError(error);
      }
    });
  }

  public getMonthlySalesIncome(): void {
    this.commonDataService.getMonthlySalesIncome().subscribe({
      next: (response: any) => {
        this.updateMonthlySalesIncomeChart(response);
      },
      error: (error: any) => {
        this.messageService.showError(error);
      }
    });
  }

  public getNoOfOrdersPlaceThisWeekByStatus(): void {
    this.commonDataService.getNoOfOrdersPlaceThisWeekByStatus().subscribe({
      next: (response: any) => {
        this.updateWeeklyOrdersByStatus(response);
      },
      error: (error: any) => {
        this.messageService.showError(error);
      }
    });
  }

  public getSalesPerOrderItem(): void {
    this.commonDataService.getSalesPerOrderItem().subscribe({
      next: (response: any) => {
        this.updateSalesPerItemChart(response);
      },
      error: (error: any) => {
        this.messageService.showError(error);
      }
    });
  }

  public updateMonthlySalesChart(dataList: any) {
    const monthlySalesData = dataList.map((data: any) =>{
      return {
        x: data.orderMonth,
        y: data.cnt
      };
    });

    this.monthlySalesChartOptions = {
      series: [
        { name: 'Numbe of Sales per Month', data: monthlySalesData }
      ],
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: '#6b7280'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Count',
          style: {
            color: '#6b7280'
          }
        },
        labels: {
          style: {
            colors: '#6b7280'
          },
        }
      },
      colors: ['#f97316'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%'
        }
      },
      grid: {
        borderColor: '#e5e7eb'
      },
      title: {
        text: 'Numbe of Sales per Month',
        align: 'center',
        style: {
          color: '#1f2937',
          fontSize: '16px'
        }
      }
    };
  }

  public updateMonthlySalesIncomeChart(dataList: any) {
    const monthlySalesIncomeData = dataList.map((data: any) =>{
      return {
        x: data.orderMonth,
        y: data.summation
      };
    });

    this.monthlySalesIncomeChartOptions = {
      series: [
        { name: 'Sales income per Month', data: monthlySalesIncomeData }
      ],
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: '#6b7280'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Count',
          style: {
            color: '#6b7280'
          }
        },
        labels: {
          style: {
            colors: '#6b7280'
          },
        }
      },
      colors: ['#076866ff'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%'
        }
      },
      grid: {
        borderColor: '#e5e7eb'
      },
      title: {
        text: 'Sales income per Month',
        align: 'center',
        style: {
          color: '#1f2937',
          fontSize: '16px'
        }
      }
    };
  }

  public updateWeeklyOrdersByStatus(dataSet: any): void {
    const data = dataSet.map((item: any) => item.cnt);
    const labels = dataSet.map((item: any) => item.status);

    this.weeklyOrdersbyStatus = {
      series: data,
      chart: {
        type: 'pie',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      labels: labels,
      colors: ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ef4444', '#06b6d4'],
      legend: {
        position: 'bottom',
        labels: {
          colors: '#6b7280'
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%'
          }
        }
      },
      title: {
        text: 'Weekly orders by status',
        align: 'center',
        style: {
          color: '#1f2937',
          fontSize: '16px'
        }
      }
    };
  }

  public updateSalesPerItemChart(dataList: any): void {
    const salesPerItemData = dataList.map((data: any) =>{
      return {
        x: data.itemName,
        y: data.cnt
      };
    });

    this.salesIncomePerItemChartOptions = {
      series: [
        { name: 'Sales Income Per Item', data: salesPerItemData }
      ],
      chart: {
        type: 'bar',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: '#6b7280'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Count',
          style: {
            color: '#6b7280'
          }
        },
        labels: {
          style: {
            colors: '#6b7280'
          },
        }
      },
      colors: ['#076866ff'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%'
        }
      },
      grid: {
        borderColor: '#e5e7eb'
      },
      title: {
        text: 'Sales income per Month',
        align: 'center',
        style: {
          color: '#1f2937',
          fontSize: '16px'
        }
      }
    };
  }
}
