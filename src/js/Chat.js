export default class Chat {
  async login(username) {
    const response = await fetch('https://mysterious-eyrie.herokuapp.com/', {
      method: 'POST',
      body: username,
    });

    if (!response.ok) return new Error(response.status);
    this.socket = new WebSocket('wss://mysterious-eyrie.herokuapp.com/');
    const chatUsers = await response.json();
    return chatUsers;
  }
}
