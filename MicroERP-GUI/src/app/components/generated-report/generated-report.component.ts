import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generated-report',
  templateUrl: './generated-report.component.html',
  styleUrl: './generated-report.component.scss'
})
export class GeneratedReportComponent {
  @Input() generatedReport: any;

  @Output() onEvent = new EventEmitter<any>();
  public sendMsg(event: any) {
    this.onEvent.emit(event)
  }
}