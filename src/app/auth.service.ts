import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getToken(tokenType: string): string | null {
    return localStorage.getItem(tokenType);
  }

  setToken(tokenType: string, token: string): void {
    localStorage.setItem(tokenType, token);
  }

  removeToken(tokenType: string): void {
    localStorage.removeItem(tokenType);
  }
}
