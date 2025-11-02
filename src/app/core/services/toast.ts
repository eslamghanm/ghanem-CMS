import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Toast {
  private readonly messages$ = new Subject<{ type: 'success'|'error'|'info'; text: string }>();
  stream() { return this.messages$.asObservable(); }
  success(text: string) { this.messages$.next({ type: 'success', text }); }
  error(text: string) { this.messages$.next({ type: 'error', text }); }
  info(text: string) { this.messages$.next({ type: 'info', text }); }
}
