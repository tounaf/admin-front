import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private activeRequests = signal<number>(0);

  public isLoading = computed(() => this.activeRequests() > 0);

  setLoading(loading: boolean) {
    if (loading) {
      this.activeRequests.update(count => count + 1);
    } else {
      this.activeRequests.update(count => Math.max(0, count - 1));
    }
  }
}
