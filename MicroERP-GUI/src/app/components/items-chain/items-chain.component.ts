import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-items-chain',
  templateUrl: './items-chain.component.html',
  styleUrl: './items-chain.component.scss'
})
export class ItemsChainComponent implements OnInit {
  @Input() itemsInput: any[] = [];
  @Input() generatedReport: any = undefined;
  itemsOutput: any[] = [];
  currIdx: number = 0;
  codeParams: any = {
    'clear': true,
    'minLength': 1,
    'placeholder': '0',
    'selectedValue': '',
    'submitTxt': 'Suivant'
  }
  @Output() onEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.itemsOutput = this.generatedReport ? this.generatedReport : _.cloneDeep(this.itemsInput);
    this.resetCodeParams();
  }

  resetCodeParams() {
    this.codeParams = {
      'clear': true,
      'minLength': 1,
      'placeholder': '0',
      'selectedValue': this.itemsOutput[this.currIdx].selectedValue ? this.itemsOutput[this.currIdx].selectedValue : '',
      'submitTxt': 'Suivant'
    }
  }

  public displayGoBackBtn() {
    return this.currIdx != 0;
  }

  public goBackToPrevStep() {
    if (this.currIdx) {
      this.currIdx -= 1;
      this.resetCodeParams();
    }
    if (this.currIdx == 0) {
      this.sendMsg({ step0: true })
    } else {
      this.sendMsg({ notStep0: true })
    }
  }

  public sendMsg(event: any) {
    this.onEvent.emit(event)
  }

  public onValueSelectionEvent(event: any) {
    this.itemsOutput[this.currIdx].selectedValue = event;
    if (this.currIdx < this.itemsOutput.length - 1) {
      this.currIdx += 1;
      this.resetCodeParams();
      this.sendMsg({ notStep0: true })
    } else {
      this.sendMsg({ generatedReport: this.itemsOutput })
    }
  }
}
