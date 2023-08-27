import { IUser } from '@/shared/model/user.model';

import { NotificationType } from '@/shared/model/enumerations/notification-type.model';
export interface INotification {
  id?: number;
  details?: string | null;
  sentDate?: Date;
  format?: NotificationType;
  googleNotificationId?: string | null;
  productId?: number;
  read?: boolean;
  user?: IUser;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public details?: string | null,
    public sentDate?: Date,
    public format?: NotificationType,
    public googleNotificationId?: string | null,
    public productId?: number,
    public read?: boolean,
    public user?: IUser
  ) {
    this.read = this.read ?? false;
  }
}
