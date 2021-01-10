export default class Control {
  init(parentEl, chat, renderer) {
    this.parentEl = parentEl;
    this.chat = chat;
    this.renderer = renderer;

    this.loginForm = document.forms.loginForm;
    this.modalBackground = parentEl.querySelector('.modal-background');

    this.loginForm.addEventListener('submit', this.loginFormHandler.bind(this));
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
        this.loginForm.classList.add('hidden');
        this.modalBackground.classList.add('hidden');
      }
    }
  }
}
