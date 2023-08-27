<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.buyer.home.createOrEditLabel" data-cy="BuyerCreateUpdateHeading">Create or edit a Buyer</h2>
        <div>
          <div class="form-group" v-if="buyer.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="buyer.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="buyer-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="buyer-name"
              data-cy="name"
              :class="{ valid: !$v.buyer.name.$invalid, invalid: $v.buyer.name.$invalid }"
              v-model="$v.buyer.name.$model"
              required
            />
            <div v-if="$v.buyer.name.$anyDirty && $v.buyer.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.buyer.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="buyer-phone">Phone</label>
            <input
              type="text"
              class="form-control"
              name="phone"
              id="buyer-phone"
              data-cy="phone"
              :class="{ valid: !$v.buyer.phone.$invalid, invalid: $v.buyer.phone.$invalid }"
              v-model="$v.buyer.phone.$model"
              required
            />
            <div v-if="$v.buyer.phone.$anyDirty && $v.buyer.phone.$invalid">
              <small class="form-text text-danger" v-if="!$v.buyer.phone.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="buyer-avatarUrl">Avatar Url</label>
            <input
              type="text"
              class="form-control"
              name="avatarUrl"
              id="buyer-avatarUrl"
              data-cy="avatarUrl"
              :class="{ valid: !$v.buyer.avatarUrl.$invalid, invalid: $v.buyer.avatarUrl.$invalid }"
              v-model="$v.buyer.avatarUrl.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="buyer-user">User</label>
            <select class="form-control" id="buyer-user" data-cy="user" name="user" v-model="buyer.user" required>
              <option v-if="!buyer.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="buyer.user && userOption.id === buyer.user.id ? buyer.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.email }}
              </option>
            </select>
          </div>
          <div v-if="$v.buyer.user.$anyDirty && $v.buyer.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.buyer.user.required"> This field is required. </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="buyer-address">Address</label>
            <select class="form-control" id="buyer-address" data-cy="address" name="address" v-model="buyer.address" required>
              <option v-if="!buyer.address" v-bind:value="null" selected></option>
              <option
                v-bind:value="buyer.address && addressOption.id === buyer.address.id ? buyer.address : addressOption"
                v-for="addressOption in addresses"
                :key="addressOption.id"
              >
                {{ addressOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.buyer.address.$anyDirty && $v.buyer.address.$invalid">
            <small class="form-text text-danger" v-if="!$v.buyer.address.required"> This field is required. </small>
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
            :disabled="$v.buyer.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./buyer-update.component.ts"></script>
