class Session {
  static instance = new Session();
  token: string | null = null;

  constructor() {
    if (Session.instance) {
      return Session.instance;
    }
    Session.instance = this;
  }

  set(value: string) {
    this.token = value;
    localStorage.setItem('session', value);
  }

  get() {
    if (!this.token) {
      this.token = localStorage.getItem('session');
    }
    return localStorage.getItem('session');
  }

  static get() {
    return Session.instance.get();
  }

  static set(value: string) {
    Session.instance.set(value);
  }
}

const session = new Session();
export default session;
