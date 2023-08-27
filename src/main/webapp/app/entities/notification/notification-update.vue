<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.notification.home.createOrEditLabel" data-cy="NotificationCreateUpdateHeading">
          Create or edit a Notification
        </h2>
        <div>
          <div class="form-group" v-if="notification.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="notification.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-details">Details</label>
            <input
              type="text"
              class="form-control"
              name="details"
              id="notification-details"
              data-cy="details"
              :class="{ valid: !$v.notification.details.$invalid, invalid: $v.notification.details.$invalid }"
              v-model="$v.notification.details.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-sentDate">Sent Date</label>
            <div class="d-flex">
              <input
                id="notification-sentDate"
                data-cy="sentDate"
                type="datetime-local"
                class="form-control"
                name="sentDate"
                :class="{ valid: !$v.notification.sentDate.$invalid, invalid: $v.notification.sentDate.$invalid }"
                required
                :value="convertDateTimeFromServer($v.notification.sentDate.$model)"
                @change="updateInstantField('sentDate', $event)"
              />
            </div>
            <div v-if="$v.notification.sentDate.$anyDirty && $v.notification.sentDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.sentDate.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.notification.sentDate.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-format">Format</label>
            <select
              class="form-control"
              name="format"
              :class="{ valid: !$v.notification.format.$invalid, invalid: $v.notification.format.$invalid }"
              v-model="$v.notification.format.$model"
              id="notification-format"
              data-cy="format"
              required
            >
              <option value="EMAIL">EMAIL</option>
              <option value="SMS">SMS</option>
              <option value="PARCEL">PARCEL</option>
            </select>
            <div v-if="$v.notification.format.$anyDirty && $v.notification.format.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.format.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-googleNotificationId">Google Notification Id</label>
            <input
              type="text"
              class="form-control"
              name="googleNotificationId"
              id="notification-googleNotificationId"
              data-cy="googleNotificationId"
              :class="{ valid: !$v.notification.googleNotificationId.$invalid, invalid: $v.notification.googleNotificationId.$invalid }"
              v-model="$v.notification.googleNotificationId.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-productId">Product Id</label>
            <input
              type="number"
              class="form-control"
              name="productId"
              id="notification-productId"
              data-cy="productId"
              :class="{ valid: !$v.notification.productId.$invalid, invalid: $v.notification.productId.$invalid }"
              v-model.number="$v.notification.productId.$model"
              required
            />
            <div v-if="$v.notification.productId.$anyDirty && $v.notification.productId.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.productId.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.notification.productId.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-read">Read</label>
            <input
              type="checkbox"
              class="form-check"
              name="read"
              id="notification-read"
              data-cy="read"
              :class="{ valid: !$v.notification.read.$invalid, invalid: $v.notification.read.$invalid }"
              v-model="$v.notification.read.$model"
              required
            />
            <div v-if="$v.notification.read.$anyDirty && $v.notification.read.$invalid">
              <small class="form-text text-danger" v-if="!$v.notification.read.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="notification-user">User</label>
            <select class="form-control" id="notification-user" data-cy="user" name="user" v-model="notification.user" required>
              <option v-if="!notification.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="notification.user && userOption.id === notification.user.id ? notification.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.email }}
              </option>
            </select>
          </div>
          <div v-if="$v.notification.user.$anyDirty && $v.notification.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.notification.user.required"> This field is required. </small>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.notification.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./notification-update.component.ts"></script>
