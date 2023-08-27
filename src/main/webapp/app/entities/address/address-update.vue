<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.address.home.createOrEditLabel" data-cy="AddressCreateUpdateHeading">Create or edit a Address</h2>
        <div>
          <div class="form-group" v-if="address.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="address.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="address-address1">Address 1</label>
            <input
              type="text"
              class="form-control"
              name="address1"
              id="address-address1"
              data-cy="address1"
              :class="{ valid: !$v.address.address1.$invalid, invalid: $v.address.address1.$invalid }"
              v-model="$v.address.address1.$model"
              required
            />
            <div v-if="$v.address.address1.$anyDirty && $v.address.address1.$invalid">
              <small class="form-text text-danger" v-if="!$v.address.address1.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="address-address2">Address 2</label>
            <input
              type="text"
              class="form-control"
              name="address2"
              id="address-address2"
              data-cy="address2"
              :class="{ valid: !$v.address.address2.$invalid, invalid: $v.address.address2.$invalid }"
              v-model="$v.address.address2.$model"
              required
            />
            <div v-if="$v.address.address2.$anyDirty && $v.address.address2.$invalid">
              <small class="form-text text-danger" v-if="!$v.address.address2.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="address-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="address-city"
              data-cy="city"
              :class="{ valid: !$v.address.city.$invalid, invalid: $v.address.city.$invalid }"
              v-model="$v.address.city.$model"
              required
            />
            <div v-if="$v.address.city.$anyDirty && $v.address.city.$invalid">
              <small class="form-text text-danger" v-if="!$v.address.city.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="address-state">State</label>
            <input
              type="text"
              class="form-control"
              name="state"
              id="address-state"
              data-cy="state"
              :class="{ valid: !$v.address.state.$invalid, invalid: $v.address.state.$invalid }"
              v-model="$v.address.state.$model"
              required
            />
            <div v-if="$v.address.state.$anyDirty && $v.address.state.$invalid">
              <small class="form-text text-danger" v-if="!$v.address.state.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="address-country">Country</label>
            <input
              type="text"
              class="form-control"
              name="country"
              id="address-country"
              data-cy="country"
              :class="{ valid: !$v.address.country.$invalid, invalid: $v.address.country.$invalid }"
              v-model="$v.address.country.$model"
              required
            />
            <div v-if="$v.address.country.$anyDirty && $v.address.country.$invalid">
              <small class="form-text text-danger" v-if="!$v.address.country.required"> This field is required. </small>
            </div>
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
            :disabled="$v.address.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./address-update.component.ts"></script>
