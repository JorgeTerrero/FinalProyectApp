import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

scheduleUrl = "http://localhost:3000/api/schedule";

constructor(private http: HttpClient) { }

GetSchedule(){
  return this.http.get(this.scheduleUrl);
}

CreateSchedule(schedule){
  return this.http.post(this.scheduleUrl,schedule);
}

UpdateSchedule(_id , schedule){
  return this.http.put(`${this.scheduleUrl}/${_id}` , schedule);
}

DeleteSchedule(_id){
  return this.http.delete(`${this.scheduleUrl}/${_id}`)
}

}
