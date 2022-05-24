import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
// @ts-ignore
import {BaseChartDirective} from "ng2-charts";
import {PeliculaService} from "../../services/pelicula.service";
import {AuthService} from "../../services/auth.service";
import {getSortInvalidDirectionError} from "@angular/material/sort/sort-errors";


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  years:number[]= [ 2018,2019,2020,2021, 2022];
  estados:string[]=['Por estrenarse', 'Disponible'];
  totalPeliculas:number=0;
  numeroPeliculas:number[]=[];
  yearsTemporales:number[]=[];
  numeroUsuarios:number[]=[];
  cantidadTotalUsuarios:number=0;
  cantidad:number= 0;
  cargar:boolean=false;
  calcularPeliculas:boolean= false;

  constructor(private authService:AuthService, private peliculaService:PeliculaService) {

  }

  ngOnInit(): void {
    for(let estado of this.estados){
      this.peliculaService.obtenerCantidadPeliculasPorEstado(estado).subscribe(dato=>{
        this.numeroPeliculas.push(dato);
        this.totalPeliculas= this.totalPeliculas+dato;
      })
    }
    for (let year of this.years){
      console.log(year);
      this.authService.getUserAmountForYear(year).subscribe(dato=>{
        this.yearsTemporales.push(year);
        this.cantidad= dato;
        this.cantidadTotalUsuarios= this.cantidadTotalUsuarios+this.cantidad;
        console.log(this.cantidad);
        this.numeroUsuarios.push(this.cantidad);
      });
    }
  }


  cargarGrafica(){
    this.cargar=true;
  }

  ocultarGrafica(){
    this.cargar=false;
  }

  cargarGraficaPeliculas(){
    this.calcularPeliculas=true;
  }

  ocultarGraficaPeliculas(){
    this.calcularPeliculas=false;
  }

  @ViewChild(BaseChartDirective) chart:BaseChartDirective| undefined;


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },

    }

  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> ={
    labels: this.yearsTemporales.reverse(),
    datasets: [
      { data:this.numeroUsuarios.reverse(), label: 'Usuarios' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },

    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.estados,
    datasets: [ {
      data: this.numeroPeliculas
    } ]
  };
  public pieChartType: ChartType = 'pie';

  // events

  changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

}
