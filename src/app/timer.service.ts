import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  interval;
  time = 0;
  display;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display = this.transform(this.time);
      
      return this.display;
    }, 1000);
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
    return hours + ":" + minutes + ":" + seconds;
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  fetchDisplay() {
    return this.display;
  }
}

