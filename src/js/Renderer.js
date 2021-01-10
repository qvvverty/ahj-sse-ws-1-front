export default class Renderer {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.usersList = parentEl.querySelector('.users');
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
    userEl.innerText = username;
    if (self) userEl.classList.add('self-user');
    return userEl;
  }
}
