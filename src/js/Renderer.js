export default class Renderer {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.usersList = parentEl.querySelector('.users');
    this.messages = parentEl.querySelector('.messages');
  }

  renderUsers(usernames, self) {
    this.usersList.innerHTML = '';
    for (const username of usernames) {
      this.usersList.append(Renderer.generateUserEl(username));
    }
    this.usersList.append(Renderer.generateUserEl(self, true));
  }

  static generateUserEl(username, self = false) {
    const userEl = document.createElement('li');
    userEl.dataset.user = username;
    userEl.innerText = username;
    if (self) userEl.classList.add('self-user');
    return userEl;
  }

  removeUser(username) {
    this.usersList.querySelector(`[data-user="${username}"]`).remove();
  }

  addUser(username) {
    this.usersList.append(Renderer.generateUserEl(username));
  }

  renderMessage(message, self = null) {
    const msgToDisplay = { ...message };
    const msgEl = document.createElement('div');
    const now = new Date();
    const nowFormatted = now.toLocaleString('ru', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    msgEl.classList.add('message');
    if (message.from === 'server') {
      msgEl.classList.add('service');
      switch (message.type) {
        case 'new user':
          msgToDisplay.message = `${message.message} присоединился к чату`;
          break;
        default:
          msgToDisplay.message = `${message.message} покинул чат`;
      }
    }
    if (self) msgEl.classList.add('self');

    msgEl.innerHTML = `
      <div class="msg-sender">${msgToDisplay.from} ${nowFormatted}</div>
      <div class="msg-text">${msgToDisplay.message}</div>
    `;
    this.messages.append(msgEl);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
}
