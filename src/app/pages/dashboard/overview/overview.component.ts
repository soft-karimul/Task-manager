import { Component, ElementRef, viewChild } from '@angular/core';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  canvas1 = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas1');
  canvas2 = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas2');


  taskAction(event:Event){

  }

  
  ngAfterViewInit(){
    this.renderChart();
}

renderChart() {
  new Chart(this.canvas1().nativeElement, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // chart 2
  new Chart(this.canvas2().nativeElement, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}







}
