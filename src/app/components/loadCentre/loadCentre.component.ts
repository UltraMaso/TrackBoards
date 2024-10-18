import { Component, ViewChild, Input  } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexFill,
} from 'ng-apexcharts';

import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {   areaLCModel,  LoadCentreInfoModel } from 'src/assets/data';
import { SearchPipe } from 'src/app/services/search.pipe';

export interface revenueForecastChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
}

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-loadCentre',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule,CommonModule,SearchPipe],
  templateUrl: './loadCentre.component.html',
})
export class LoadCentreComponent {

  @Input() loadData: any[];
  @Input() query: string;


  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenueForecastChart!: Partial<revenueForecastChart> | any;

  months: month[] = [
    { value: 'mar', viewValue: 'Sep 2024' },
    { value: 'apr', viewValue: 'Oct 2024' },
    { value: 'june', viewValue: 'Nov 2024' },
  ];

  constructor() {
    this.revenueForecastChart = {
      series: [
        {
          name: '2024',
          data: [1.2, 2.7, 1, 3.6, 2.1, 2.7, 2.2, 1.3, 2.5],
        },
        {
          name: '2023',
          data: [-2.8, -1.1, -2.5, -1.5, -2.3, -1.9, -1, -2.1, -1.3],
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        height: 295,
        stacked: true,
        offsetX: -15,
        toolbar: {
          show: false,
        },
      },
      colors: ['rgba(99, 91, 255, 1)', 'rgba(255, 102, 146,1)'],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '60%',
          columnWidth: '15%',
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
        },
        borderColor: 'rgba(0,0,0,0.05)',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },

      yaxis: {
        min: -5,
        max: 5,
        tickAmount: 4,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
        ],
        labels: {
          style: { fontSize: '13px', colors: '#adb0bb', fontWeight: '400' },
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }
  ruevenTable = new areaLCModel();
  lensTable = new areaLCModel();
  roodeportTable =  new areaLCModel();
  hurstHillTable = new areaLCModel();
 northTable =  new areaLCModel();
 revTempModel:LoadCentreInfoModel[] = [];
 lensTempModel:LoadCentreInfoModel[] = [];
 hurlTempModel:LoadCentreInfoModel[] = [];
 roodTempModel:LoadCentreInfoModel[] = [];
 northTempModel:LoadCentreInfoModel[] = [];
  
  excelData: any[];
  PageTitle: any = "";
  headers:any = [];
  header :any = "";
  hasHeader: boolean = false;
  hasSelectedSheet:boolean = false;
  newTqable: boolean = false;
  files: any[];
  Reuven: any[];
  jsosn: any;
  ngOnChanges(event: any) {
 

this.loadData.forEach(result => {
  if(result[0] == "Rueven")
    {
      alert("Rueven");
    }
  var arr = new Array();
  arr = result;
  let headers = [];
var currentheader = "";
let hasHeaders:boolean = false;


  if(arr.length < 2 && arr.length > 0)
  {
    if(!this.hasHeader)
    {   
      this.newTqable = true;
      currentheader = result[0];
    }
 
  }else if(arr.length > 2 && arr.length > 0)
  {
    this.newTqable = true;

      if(arr[0] == "SDC")
      {
         
          this.headers = result;
          this.ruevenTable.headers =  this.headers ;          

        headers = arr;

        hasHeaders = true;
      }  else{
      let temp:LoadCentreInfoModel= {
      
        sdc: result[0],
        substation: result[1],
        feederDesc: result[2],
        distributorDescprition: result[3],
        loadCentreType: result[4],
        quantities: result[5],
        outgateDate: result[6],
        comments: result[7],
      };
      
        switch (arr[0]) {
          case "Reuven":
            arr = result;
            console.log(JSON.stringify(temp))
          this.revTempModel.push(temp);
            break;
        case "Lenasia":
          arr = result;
          this.lensTempModel.push(temp);

          break;
          case "Hursthill":
            arr = result;
            this.hurlTempModel.push(temp);

          break;
          case "Roodepoort":
            arr = result;
            this.roodTempModel.push(temp);

            break;
            case "north SDC":
              arr = result;
              this.northTempModel.push(temp);
              break;
          default:
            break;
        }
      }
      
  }
  else if(arr.length == 0)
  {
    this.newTqable = false;
    this.hasHeader = false;
  }
  console.log(arr);
});
this.ruevenTable.values = this.revTempModel;
this.lensTable.values = this.lensTempModel;
this.roodeportTable.values = this.roodTempModel;
this.hurstHillTable.values = this.hurlTempModel;
this.northTable.values = this.northTempModel;
   console.log(this.ruevenTable.values);
 
     }
   }
 

