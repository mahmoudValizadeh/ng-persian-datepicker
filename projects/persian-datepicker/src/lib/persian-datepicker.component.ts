import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'jalali-moment'
@Component({
  selector: 'ng-persian-datepicker',
  templateUrl: 'persian-datepicker.html',
  styleUrls: ['persian-datepicker.scss']
})
export class PersianDatepickerComponent implements OnInit {
  localeString: string = 'fa';
  navDate: any;
  @Input() maxPreviousMonth?: number;
  @Input() maxNextMonth?: number;
  weekDaysHeaderArr: Array<string> = [];
  gridArr: Array<any>;
  selectedDate: any;
  constructor() { }

  ngOnInit(): void {
    moment.locale(this.localeString);
    this.navDate = moment();
    this.selectedDate = moment();
    this.makeHeader();
    this.makeGrid();
  }
  changeNavMonth(num, datePart){
  if(this.canChangeNavMonth(this.navDate, num, datePart)){
  this.navDate.add(num, datePart);
  this.makeGrid();
  }
}
private canChangeNavMonth(dateToCheck, num, datePart){
  const clonedDate = moment(dateToCheck);
  clonedDate.add(num, datePart);
  if (this.maxPreviousMonth || this.maxNextMonth) {
    let minimumDate;
    let maximumDate;
    if (this.maxPreviousMonth) {
      minimumDate = moment().add((this.maxPreviousMonth+1) * -1, 'month')
    }
    if (this.maxNextMonth) {
      maximumDate = moment().add(this.maxNextMonth, 'month')
    }
    if (!this.maxPreviousMonth)
      return clonedDate.isBefore(maximumDate);
    else if (!this.maxNextMonth) 
      return clonedDate.isAfter(minimumDate);
    else 
      return clonedDate.isBetween(minimumDate,maximumDate);
  }
  return true;
}
makeHeader(){
  const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
  weekDaysArr.forEach(day => this.weekDaysHeaderArr.push(moment().weekday(day).format('dd')));
}
makeGrid(){
  this.gridArr = [];

  const firstDayDate = moment(this.navDate).startOf('month');
  const initialEmptyCells = firstDayDate.weekday();
  const lastDayDate = moment(this.navDate).endOf('month');
  const lastEmptyCells = 6 - lastDayDate.weekday();
  const daysInMonth = this.navDate.daysInMonth();
  const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

  for(let i = 0; i < arrayLength; i++){
    let obj: any = {};
    if(i < initialEmptyCells || i > initialEmptyCells + daysInMonth -1){
      obj.value = 0;
      obj.available = false;
    } else {
      obj.value = i - initialEmptyCells +1;
      obj.available = this.isAvailable(i - initialEmptyCells +1);
    }
    this.gridArr.push(obj);
  }
}

isAvailable(num: number): boolean{
  // let dateToCheck = this.dateFromNum(num, this.navDate);
  //   if(dateToCheck.isBefore(moment(), 'day')){
  //       return true;
  //   } else {
  //       return false;
  //   }
  return true;
}
dateFromNum(num: number, referenceDate: any): any{
  let returnDate = moment(referenceDate);
  return returnDate.date(num);
} 
selectDay(day) {
  if(day.available){
    this.selectedDate = this.dateFromNum(day.value, this.navDate);
  }
}
}
