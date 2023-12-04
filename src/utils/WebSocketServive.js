import {Client} from '@stomp/stompjs';
class WebSocketService {
  constructor(url, user) {
    this.stompClient = null;
    this.stompConfig = {
      brokerURL: url,
      connectHeaders: {},
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      debug: function (str) {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      onConnect: frame => {
        console.log('WebSocket connected');
      },
      onStompError: frame => {
        console.log('WebSocket error: ' + frame.body);
      },
    };
    this.initializeWebSocket(user);
  }

  initializeWebSocket(user) {
    this.stompClient = new Client(this.stompConfig);
    this.stompClient.activate();
  }

  // Phương thức gửi comment
  sendComment(message, callback) {
    this.stompClient.publish({
      destination: '/app/sender-comment',
      body: JSON.stringify(message),
    });
  }
  subscribeToCommentIsSendSuccess(user, callback) {
    this.stompClient.subscribe(`/user/${user.userId}/reply`, message => {
      const data = JSON.parse(message.body);
      callback(data);
    });
  }
  subscribeToComment(user, callback) {
    this.stompClient.subscribe(`/user/${user.userId}/comment`, message => {
      const data = JSON.parse(message.body);
      callback(data);
    });
  }
  // Phương thức gửi tin nhắn
  sendMessage(message) {
    this.stompClient.publish({
      destination: '/app/sender-message',
      body: JSON.stringify(message),
    });
  }

  // Phương thức lắng nghe tin nhắn
  subscribeToMessage(userId,callback) {
    this.stompClient.subscribe(
      `/user/${userId}/message`,
      message => {
        console.log(message.body)
        callback(JSON.parse(message.body));
      },
    );
  }
  subscribeToMessageIsSendSuccess(userId, callback) {
    this.stompClient.subscribe(`/user/${userId}/reply-message`, message => {
      const data = JSON.parse(message.body);
      callback(data);
    });
  }

  // Phương thức gửi like
  sendLike(message) {
    this.stompClient.publish({
      destination: '/app/sender-like',
      body: JSON.stringify(message),
    });
  }

  // Phương thức lắng nghe like
  subscribeToLike(callback,user) {
    this.stompClient.subscribe(`/user/${user.userId}/topic/like`, message => {
      callback(JSON.parse(message.body));
    });
  }

  

  // Phương thức gửi lời mời kết bạn
  sendFriend(message) {
    this.stompClient.publish({
      destination: '/app/sender-friend',
      body: JSON.stringify(message),
    });
  }

  // Phương thức lắng nghe lời mời kết bạn
  subscribeToFriend(user,callback) {
    this.stompClient.subscribe(`/user/${user.userId}/friend`, message => {
      callback(JSON.parse(message.body));
    });
  }
  subscribeToNotification(user,callback) {
    this.stompClient.subscribe(`/user/${user.userId}/friend`, message => {
      callback(JSON.parse(message.body));
    });
  }
}

export default WebSocketService;
