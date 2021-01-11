export default class Control {
  init(parentEl, chat, renderer) {
    this.parentEl = parentEl;
    this.chat = chat;
    this.renderer = renderer;

    this.loginForm = document.forms.loginForm;
    this.msgForm = document.forms.msgForm;
    this.modalBackground = parentEl.querySelector('.modal-background');

    this.loginForm.addEventListener('submit', this.loginFormHandler.bind(this));
    this.msgForm.addEventListener('submit', this.msgFormHandler.bind(this));
  }

  async loginFormHandler(submit) {
    submit.preventDefault();
    this.selfUser = this.loginForm.username.value;
    if (this.selfUser) {
      const response = await this.chat.login(this.loginForm.username.value);
      if (response instanceof Error && response.message === '403') {
        alert('Username exists, try another'); // потом, конечно, сделать по-человечески
      } else if (Array.isArray(response)) {
        this.renderer.renderUsers(response, this.selfUser);

        this.chat.socket.addEventListener('message', this.newMsgHandler.bind(this));

        this.loginForm.classList.add('hidden');
        this.modalBackground.classList.add('hidden');
      }
    }
  }

  msgFormHandler(submit) {
    submit.preventDefault();
    const message = this.msgForm.message.value;
    if (message) {
      this.chat.socket.send(message);
      this.msgForm.message.value = '';
    }
  }

  newMsgHandler(event) {
    // console.log(JSON.parse(event.data));
    const message = JSON.parse(event.data);

    if (message.from === 'server') {
      switch (message.type) {
        case 'user left':
          this.renderer.removeUser(message.message);
          break;
        case 'new user':
          if (message.message !== this.selfUser) {
            this.renderer.addUser(message.message);
          }
          break;
        default:
          console.log(`Server message: ${message.message}`);
      }

      this.renderer.renderMessage(message);
    } else if (message.from === this.selfUser) {
      this.renderer.renderMessage(message, this.selfUser);
    } else {
      this.renderer.renderMessage(message);
    }
  }
}
