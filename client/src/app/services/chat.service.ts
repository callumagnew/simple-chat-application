import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: Subject<Message> = new Subject();

  socket = io("ws://localhost:8080");

  constructor() { }

  public sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: Message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

}
