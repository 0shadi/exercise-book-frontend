import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { CommonDataServiceService } from 'src/app/services/common-data-service/common-data-service.service';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-sales-per-item',
  standalone: false,
  templateUrl: './sales-per-item.component.html',
  styleUrl: './sales-per-item.component.scss'
})
export class SalesPerItemComponent {
  @ViewChild('chart') chart: ChartComponent;
  salesIncomePerItemChartOptions: any = {};

  constructor(private commonDataService: CommonDataServiceService, private messageService: MessageServiceService) {
    this.getSalesPerOrderItem();
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
