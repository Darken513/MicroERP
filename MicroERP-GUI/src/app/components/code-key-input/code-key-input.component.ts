import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-code-key-input',
  templateUrl: './code-key-input.component.html',
  styleUrls: ['./code-key-input.component.scss']
})
export class CodeKeyInputComponent implements OnInit {

  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  enteredCode = '';
  private _params: any;

  @Input()
  set params(value: any) {
    this._params = value;
    this.ngOnInit();
  }

  get params(): any {
    return this._params;
  }
  @Output() onEvent = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.params && this.params.selectedValue != undefined) {
      this.enteredCode = this.params.selectedValue;
    }
  }

  public sendMsg() {
    if (this.enteredCode.length >= (this.params && this.params.minLength ? this.params.minLength : 3)) {
      this.onEvent.emit(this.enteredCode)
    }
  }

  onDigitClick(digit: number): void {
    if (this.enteredCode.length < 4) {
      if (this.params && this.params.clear && this.enteredCode == '0') {
        this.enteredCode = '';
      }
      this.enteredCode += digit.toString();
    }
  }

  onActionClick(event: string): void {
    if (event == 'resetOne') {
      if (this.enteredCode.length)
        this.enteredCode = this.enteredCode.slice(0, -1);
    } else if (event == 'resetAll') {
      this.enteredCode = '';
    }
  }

}
