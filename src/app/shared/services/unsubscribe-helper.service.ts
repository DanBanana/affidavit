import { Injectable } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';

type Unsub = Unsubscribe | null | void;

@Injectable()
export class UnsubscribeHelperService {
  private unsubMap = new Map<string, Unsub>();

  set(key: string, unsub: Unsub): void {
    this.unsubMap.get(key)?.();
    this.unsubMap.set(key, unsub);
  }

  clearAll(): void {
    this.unsubMap.forEach((item) => item?.());
  }
}
