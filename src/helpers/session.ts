class Session {
  static instance = new Session();
  token: string | null = null;

  constructor() {
    if (Session.instance) {
      return Session.instance;
    }
    Session.instance = this;
  }

  set(value: string | null) {
    this.token = value;
    if (typeof window !== 'undefined' && window.localStorage !== undefined) {
      if (value) {
        localStorage.setItem('session', value);
      } else {
        localStorage.removeItem('session');
      }
    }
  }

  get() {
    if (typeof window !== 'undefined' && window.localStorage !== undefined) {
      if (!this.token) {
        this.token = localStorage.getItem('session');
      }
      return localStorage.getItem('session');
    }

    return this.token;
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
