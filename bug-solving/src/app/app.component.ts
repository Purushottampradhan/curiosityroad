import { Component } from '@angular/core';
import{WebSocketService} from "./web-socket.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMessage: string|any;
  messageList:  string[] = [];
  title = 'bug-solving';
  id: string|any;
  body: string | any;
  constructor(private chatService: WebSocketService) {
  }
  // sendMessage() {
  //   this.chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

  // ngOnInit() {
  //   this.chatService
  //     .getMessages()
  //     .subscribe((message: string) => {
  //       this.messageList.push(message);
  //     });
  // }
}
