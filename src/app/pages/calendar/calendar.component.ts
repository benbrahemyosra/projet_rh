import { Component, OnInit } from '@angular/core';
import { CalendarService } from "./service/calendar.service";
import { CalendarOptions } from '@fullcalendar/angular'; 
import { PlanningService } from '../planning/service/planning.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
eventsDate: any[] = []
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    themeSystem: 'Litera'
      // { title: 'event 2', date: '2019-04-02' }
      
  };

  handleDateClick(args: any){
    // alert(args.dateStr)   
    this.eventsDate.push( { title: 'new event', date: args.dateStr })
    this.calendarOptions.events=this.eventsDate
  }
  newList: any;
  finalArray: Array<any> = [];
  // listDataMap = {
  //   eight: [
  //     { type: 'warning', content: 'This is warning event.' },
  //     { type: 'success', content: 'This is usual event.' }
  //   ],
  //   ten: [
  //     { type: 'warning', content: 'This is warning event.' },
  //     { type: 'success', content: 'This is usual event.' },
  //     { type: 'error', content: 'This is error event.' }
  //   ],
  //   eleven: [
  //     { type: 'warning', content: 'This is warning event' },
  //     { type: 'success', content: 'This is very long usual event........' },
  //     { type: 'error', content: 'This is error event 1.' },
  //     { type: 'error', content: 'This is error event 2.' },
  //     { type: 'error', content: 'This is error event 3.' },
  //     { type: 'error', content: 'This is error event 4.' }
  //   ]
  // };

  constructor(
    public calendarService: CalendarService,
    public planningService: PlanningService

  ) { }

  ngOnInit(): void {
    // this.planningService.getTacheEmp(localStorage.getItem('iduser')).subscribe((res: any[])=>{
    //   const tachesToDisplay : any[] = [];
    //   res.forEach(e=>{
    //     tachesToDisplay.push({title: e.titre, start: e.date_debut, end: e.date_fin, color: '#2bbacb'})

    //   })
    //   this.calendarOptions.events = tachesToDisplay
    //   console.log(res);
      
    // })

    // this.planningService.getAllplanning(1).subscribe((res: any)=>{
    //   const tachesToDisplay : any[] = [];
    //   res.data.forEach(e=>{
    //     tachesToDisplay.push({title: e.titre, start: e.date_debut, end: e.date_fin, color: '#2bbacb'})

    //   })
    //   this.calendarOptions.events = tachesToDisplay
    //   console.log(res);
    // })

    this.planningService.getPlanningEmp(localStorage.getItem('iduser')).pipe(
      mergeMap((events1: any)=>{
        let planingsToDisplay: any[] = [];
        events1.data.forEach(e=>{
          console.log();
          
          planingsToDisplay.push({title: e.titre, start: e.date_debut, end: e.date_fin, color: '#2bbacb'})
  
        })
        return this.planningService.getTacheEmp(localStorage.getItem('iduser')).pipe(
          map((events2: any[])=>{
            events2.forEach(e=>{
              planingsToDisplay.push({title: e.titre, start: e.date_debut, end: e.date_fin, color: '#ee9247'})
            })
            this.calendarOptions.events = planingsToDisplay
          })
        )
      })
    ).subscribe()
    //this.calendarService.getPlanning().subscribe((res: any) => {
      //this.newList = res.data.map((el: any) => ({
        //[el.date_end.slice(-2)]: {
          //type: "error",
          //objectif: el.objectif,
          //date : +el.date_end.slice(-2)
        //},
        //[el.date_start.slice(-2)]: {
          //type: "success",
          //objectif: el.objectif,
          //date : +el.date_start.slice(-2)
        //}
      //}))
      //this.newList.forEach((element, index) => {
        //for (const key in element) {
          //this.finalArray.push( element[key] = element[key] );
        //}
      //});
      //console.log(this.finalArray);
      
    //})
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
