import { Component, ViewChild ,Input} from '@angular/core';
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
import {   areaTransformerModel, TransformerInfoModel } from 'src/assets/data';

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
  selector: 'app-pos',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule,CommonModule],
  templateUrl: './pos.component.html',
})
export class POSComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  @Input() POSData: any[];
  @Input() query: string;

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
  ruevenTable = new areaTransformerModel();
  lensTable = new areaTransformerModel();
  roodeportTable =  new areaTransformerModel();
  hurstHillTable = new areaTransformerModel();
 northTable =  new areaTransformerModel();
 revTempModel:TransformerInfoModel[] = [];
 lensTempModel:TransformerInfoModel[] = [];
 hurlTempModel:TransformerInfoModel[] = [];
 roodTempModel:TransformerInfoModel[] = [];
 northTempModel:TransformerInfoModel[] = [];
  
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

  ngOnChanges(changes: any) {
    alert(JSON.stringify(this.POSData));
}


  onFileChange(event: any) {
     // File received
     const fileReced: DataTransfer = <DataTransfer>(event.target);
console.log("testing");
     // Check how many files are received
     if (fileReced.files.length > 1) {
       return;
     } else {
       const reader: FileReader = new FileReader();
 
       reader.onload = (e: any) => {
         const binarystring: string = e.target.result;
 
         const workbook: XLSX.WorkBook = XLSX.read(binarystring, { type: 'binary' });
         const worksheetname = workbook.SheetNames[0];
         this.files = workbook.SheetNames;

        
         const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetname];
 
         // Converting to JSON
         let excelsheetdata = (XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
 
         // Print the Excel Data
        this.excelData =  JSON.parse(JSON.stringify(excelsheetdata));
        console.log(this.excelData );
let hasHeaders:boolean = false;


let transformerTable = {"Title":"","data":[]};
let feederTable = {"Title":"","data":[]};
let loadCentreTable = {"Title":"","data":[]};
let consolidatedTable = {"Title":"","data":[]};
let posTable = {"Title":"","data":[]};

this.excelData.forEach(result => {
  if(result[0] == "Rueven")
    {
      alert("Rueven");
    }
  var arr = new Array();
  arr = result;
  let headers = [];
var currentheader = "";


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
      let temp:TransformerInfoModel= {
      
        sdc: result[0],
        substation: result[1],
        transSize: result[2],
        trasnsDescription: result[3],
        outgateDate: result[4],
        comments: result[5],
        cost: result[6],
        update: result[7],
      
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


        

         // You can use a loop to display the data on screen or process it as needed
       };
 
       reader.readAsArrayBuffer(fileReced.files[0]);
     }
   }

   ChangeFiles(value:any)
   {
this.PageTitle = value;
this.hasSelectedSheet = true;
   }

   printMsg()
   {}
}
