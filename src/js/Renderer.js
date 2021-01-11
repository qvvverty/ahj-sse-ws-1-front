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
}
