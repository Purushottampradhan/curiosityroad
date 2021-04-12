import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {AppComponent } from "./app.component";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) { }
//   public sendMessage(message:any) {
//     this.socket.emit('new-message', message);
// }

// public getMessages = () => {
//   return Observable.create((observer:any) => {
//           this.socket.on('new-message', (message:any) => {
//               observer.next(message);
//           });
//   });
// }

}
