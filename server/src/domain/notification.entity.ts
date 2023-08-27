/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { NotificationType } from './enumeration/notification-type';

import { User } from './user.entity';

/**
 * A Notification.
 */
@Entity('notification')
export class Notification extends BaseEntity {
    @Column({ name: 'details', nullable: true })
    details: string;

    @Column({ type: 'datetime', name: 'sent_date' })
    sentDate: any;

    @Column({ type: 'simple-enum', name: 'format', enum: NotificationType })
    format: NotificationType;

    @Column({ name: 'google_notification_id', nullable: true })
    googleNotificationId: string;

    @Column({ type: 'long', name: 'product_id' })
    productId: number;

    @Column({ type: 'boolean', name: 'read' })
    read: boolean;

    @ManyToOne((type) => User)
    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
