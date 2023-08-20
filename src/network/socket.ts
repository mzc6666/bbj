/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-03-17 13:31:09
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-21 21:58:22
 */

let instance: Socket | null = null;

class Socket {
  baseURL: string;
  socket: WebSocket;
  callbacks: any;
  constructor(id: number, username: string, cover: string) {
    this.baseURL = 'ws://49.234.98.161:8000';
    this.socket = this.init(id, username, cover);
    this.callbacks = {};
    this.socket.onopen = this.socketOpen;
    this.socket.onerror = this.socketError;
    this.socket.onclose = this.socketClose;
    this.socket.onmessage = this.socketMessage.bind(this);
    instance = this;
    console.log('this.callbacks', this.callbacks);
  }
  init(id: number, username: string, cover: string) {
    return new WebSocket(
      `${this.baseURL}?id=${id}&username=${username}&cover=${cover}`,
    );
  }
  socketOpen() {
    console.log('SOCKET OPEN SUCCESS!!!');
  }
  socketError(error: WebSocketErrorEvent) {
    console.log(['SOCKET', error].join(''));
  }
  socketClose() {
    console.log('SOCKET CLOSE');
  }
  socketMessage(data: WebSocketMessageEvent) {
    const { eventName, ...args } = JSON.parse(data.data);
    this.callbacks[eventName]?.forEach((fn: Function) => fn(args));
  }
  addListener(type: string, callback: Function) {
    this.callbacks[type] = this.callbacks[type]?.concat(callback) ?? [callback];
  }
  sendData(data: any) {
    this.socket.send(JSON.stringify(data));
  }
}

const SOCKET_EVENT_TYPE = {
  RECEIVE_MESSAGE_EVENT: 'receiveMsg',
};

export { SOCKET_EVENT_TYPE, Socket, instance };
