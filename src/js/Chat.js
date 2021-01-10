export default class Chat {
  async login(username) {
    const response = await fetch('http://localhost:7070/', {
      method: 'POST',
      body: username,
    });

    if (!response.ok) return new Error(response.status);
    this.socket = new WebSocket('ws://localhost:7070/');
    this.addEventListeners();
    const chatUsers = await response.json();
    return chatUsers;
  }

  addEventListeners() {
    this.socket.addEventListener('open', this.onOpen.bind(this)); // проверить, нужен ли bind
    this.socket.addEventListener('message', this.onMessage.bind(this));
  }

  onOpen(event) {
    this.socket.send('something');
  }

  onMessage(event) {
    console.log(JSON.parse(event.data));
  }
}

// login(username) {
//   fetch('http://localhost:7070/', {
//     method: 'POST',
//     body: username,
//   })
//     .then((response) => {
//       if (response.ok) {
//         return new WebSocket('ws://localhost:7070/');
//       }
//       return null;
//     })
//     .then((socket) => {
//       socket.addEventListener('open', (event) => {
//         socket.send('something');
//       });

//       socket.addEventListener('message', (event) => {
//         console.log(JSON.parse(event.data));
//       });
//     });
// }
