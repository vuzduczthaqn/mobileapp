import { Client } from '@stomp/stompjs';
import { url } from '../url_request';

class WebSocketService {
  constructor( destination, onMessageCallback, onErrorCallback) {
    this.client = new Client({
      brokerURL: url.socket_send_like_post,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
    });

    this.destination = destination;
    this.onMessageCallback = onMessageCallback;
    this.onErrorCallback = onErrorCallback;

    this.client.onConnect = frame => {
      this.client.subscribe(this.destination, message => {
        return message.body
      });

      if (this.onConnectCallback) {
        this.onConnectCallback();
      }
    };

    this.client.onStompError = frame => {
      if (this.onErrorCallback) {
        this.onErrorCallback('Additional details: ' + frame.body);
      }
    };
  }

  connect(onConnectCallback) {
    this.onConnectCallback = onConnectCallback;
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  send(data, action) {
    this.client.publish({
      destination: action,
      body: data,
    });
  }
}

export default WebSocketService;
