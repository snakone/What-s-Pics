import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppStorage } from '@app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  data: AppStorage = new AppStorage();

  constructor(private storage: Storage) {
    console.log('StorageService');
  }

  public async load() {
    const settings: AppStorage = await this.storage.get('settings');
    if (settings) { this.data = settings; }
  }

  public async save(key: string, value?: any) {
    this.data[key] = value;
    await this.storage.set('settings', this.data);
  }

  public get(): AppStorage {
    return this.data;
  }

  public async clear() {
    this.data = new AppStorage();
    await this.storage.clear();
  }

  public getToken(): string {
    return this.data.token;
  }

  public setToken(token: string): void {
    if (!token) { return; }
    this.data.token = token;
    this.save('token', token);
  }

  public removeToken(): void {
    this.data.token = '';
    this.save('token', '');
  }

}
