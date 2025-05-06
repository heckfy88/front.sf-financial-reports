import { makeAutoObservable } from 'mobx';
import { setUserClientId } from "_services/operuid.service.js";

class AuthStore {
  token = localStorage.getItem('token');
  isAuthenticated = !!this.token;
  #api;

  constructor(api) {
    this.#api = api;
    makeAutoObservable(this);
  }

  async login(email, password) {
    setUserClientId();
    try {
      const { data } = await this.#api.post('/auth/login', { "email": email, "password": password });
      this.setToken(data.token);
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  setToken(token) {
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem('token', token);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }
}

export default AuthStore;
