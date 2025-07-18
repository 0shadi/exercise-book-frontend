// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/CacheService';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { OnlineOrderingService } from 'src/app/services/online-ordering/online-ordering.service';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  readStatus: boolean;
  targetUser?: number;
  other?: string;
  email?: string;
  mobile?: string;
}

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  numberOfItems = 0;
  orderItems: any;
  unreadCount = 0;
  notifications: Notification[] = [];
  userName: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private cacheService: CacheService,
    private onlineOrderingService: OnlineOrderingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications: any) => {
        console.log(notifications);
        this.notificationService.addNotificationToBell(notifications);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      this.unreadCount = notifications.filter((n) => !n.readStatus).length;
    });

    this.onlineOrderingService.cartItems.subscribe((items) => {
      this.numberOfItems = items.length;
      this.orderItems = items;
    });

    this.getUserName();
  }

  public getUserName() {
    this.userName = this.httpService.getLoginNameFromCache();
  }

  public logOutUser(): void {
    this.onlineOrderingService.emptyCartData();
    this.cacheService.clear(this.httpService.getUserId()!);
    this.httpService.removeToken();
    this.router.navigate(['/auth/signin']);
  }

  public removeItemFromCart(itemToRemove: any) {
    this.onlineOrderingService.removeItem(itemToRemove);
  }

  public markAllAsRead(): void {
    this.notifications.forEach((notification) => {
      if (!notification.readStatus) {
        this.notificationService.markAsRead(notification.id);
      }
    });
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId);
  }

  getRelativeTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }
}
