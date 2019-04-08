import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppStorage } from '@app/shared/interfaces/interfaces';
import { STORAGE_CONSTANTS } from '../storage.config';

@Injectable()

export class StorageService {

  data: AppStorage = new AppStorage();

  constructor(private storage: Storage) {
    console.log('StorageService');
  }

  public async load(): Promise<any> {
    const settings: AppStorage = await this.storage.get(STORAGE_CONSTANTS.KEY);
    settings ? this.data = settings : this.save();
  }

  public async save(key?: string, value?: any): Promise<any> {
    if (key) { this.data[key] = value; }
    await this.storage.set(STORAGE_CONSTANTS.KEY, this.data);
  }

  public setId(id: string): void {
    this.data.id = id;
  }

  public getId(): string {
    return this.data.id;
  }

  public get(): AppStorage {
    return this.data;
  }

  public async clear(): Promise<void> {
    this.data.token = '';
    this.save();
  }

  public async reset(): Promise<void> {
    this.data = new AppStorage();
    await this.storage.clear();
  }

  public getToken(): string {
    return this.data.token;
  }

  public getLanguage(): string {
    return this.data.lang;
  }

  public setToken(token: string): void {
    if (!token) { return; }
    this.data.token = token;
    this.save(STORAGE_CONSTANTS.TOKEN, token);
  }

  public removeToken(): void {
    this.data.token = '';
    this.save(STORAGE_CONSTANTS.TOKEN, '');
  }

}
