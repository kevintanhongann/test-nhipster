<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="notification">
        <h2 class="jh-entity-heading" data-cy="notificationDetailsHeading"><span>Notification</span> {{ notification.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Details</span>
          </dt>
          <dd>
            <span>{{ notification.details }}</span>
          </dd>
          <dt>
            <span>Sent Date</span>
          </dt>
          <dd>
            <span>{{ notification.sentDate | formatDate }}</span>
          </dd>
          <dt>
            <span>Format</span>
          </dt>
          <dd>
            <span>{{ notification.format }}</span>
          </dd>
          <dt>
            <span>Google Notification Id</span>
          </dt>
          <dd>
            <span>{{ notification.googleNotificationId }}</span>
          </dd>
          <dt>
            <span>Product Id</span>
          </dt>
          <dd>
            <span>{{ notification.productId }}</span>
          </dd>
          <dt>
            <span>Read</span>
          </dt>
          <dd>
            <span>{{ notification.read }}</span>
          </dd>
          <dt>
            <span>User</span>
          </dt>
          <dd>
            {{ notification.user ? notification.user.email : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="notification.id"
          :to="{ name: 'NotificationEdit', params: { notificationId: notification.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./notification-details.component.ts"></script>
