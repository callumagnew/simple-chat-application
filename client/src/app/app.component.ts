import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from './models/models';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('username') usernameInput!: ElementRef;
  @ViewChild('message') messageInput!: ElementRef;

  username = '';
  messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message: Message) => {
      this.messages.push(message);
    })
  }

  handleUsername(event: any): void {
    event.preventDefault();
    this.username = this.usernameInput.nativeElement.value;
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
    })
  }

  handleMessage(event: any): void {
    event.preventDefault();
    if(!!this.messageInput.nativeElement.value) {
      const message = this.messageInput.nativeElement.value;
      let messageObject: Message = {
        username: this.username,
        message: message,
        date: new Date()
      };

      this.chatService.sendMessage(messageObject);
      this.messageInput.nativeElement.value = '';
    }

  }
}
