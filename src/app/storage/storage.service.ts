import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    public getItem(key: string): any {
        let stored: any;

        try {
            stored = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            stored = null;
        }

        return stored;
    }

    public setItem(key: string, value: any) {
        let toStore = JSON.stringify(value);

        localStorage.setItem(key, toStore);
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }
}