/// Storage service to provide access to browser storage (localStorage) using Angular's dependency injection system. ///


import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new
    InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

export class Storage {}
