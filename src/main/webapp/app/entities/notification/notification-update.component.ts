import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import { INotification, Notification } from '@/shared/model/notification.model';
import NotificationService from './notification.service';

const validations: any = {
  notification: {
    details: {},
    sentDate: {
      required,
    },
    format: {
      required,
    },
    googleNotificationId: {},
    productId: {
      required,
      numeric,
    },
    read: {
      required,
    },
    user: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class NotificationUpdate extends Vue {
  @Inject('notificationService') private notificationService: () => NotificationService;
  public notification: INotification = new Notification();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.notificationId) {
        vm.retrieveNotification(to.params.notificationId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.notification.id) {
      this.notificationService()
        .update(this.notification)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Notification is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.notificationService()
        .create(this.notification)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Notification is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.notification[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.notification[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.notification[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.notification[field] = null;
    }
  }

  public retrieveNotification(notificationId): void {
    this.notificationService()
      .find(notificationId)
      .then(res => {
        res.sentDate = new Date(res.sentDate);
        this.notification = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
