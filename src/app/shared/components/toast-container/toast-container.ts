import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Toast } from '../../../core/services/toast';

@Component({
  selector: 'app-toast-container',
  standalone: false,
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css'
})
export class ToastContainer implements OnInit, OnDestroy {
  messages: { id: string; type: 'success'|'error'|'info'; text: string }[] = [];
  private sub?: Subscription;

  constructor(private toast: Toast) {}

  ngOnInit(): void {
    this.sub = this.toast.stream().subscribe(m => {
      const id = `${Date.now()}_${Math.random()}`;
      this.messages.push({ id, ...m });
      // auto dismiss
      timer(3000).subscribe(() => this.dismiss(id));
    });
  }

  dismiss(id: string) {
    this.messages = this.messages.filter(m => m.id !== id);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
