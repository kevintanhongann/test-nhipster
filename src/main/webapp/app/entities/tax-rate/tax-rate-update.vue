<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.taxRate.home.createOrEditLabel" data-cy="TaxRateCreateUpdateHeading">Create or edit a TaxRate</h2>
        <div>
          <div class="form-group" v-if="taxRate.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="taxRate.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-country">Country</label>
            <input
              type="text"
              class="form-control"
              name="country"
              id="tax-rate-country"
              data-cy="country"
              :class="{ valid: !$v.taxRate.country.$invalid, invalid: $v.taxRate.country.$invalid }"
              v-model="$v.taxRate.country.$model"
              required
            />
            <div v-if="$v.taxRate.country.$anyDirty && $v.taxRate.country.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.country.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-state">State</label>
            <input
              type="text"
              class="form-control"
              name="state"
              id="tax-rate-state"
              data-cy="state"
              :class="{ valid: !$v.taxRate.state.$invalid, invalid: $v.taxRate.state.$invalid }"
              v-model="$v.taxRate.state.$model"
              required
            />
            <div v-if="$v.taxRate.state.$anyDirty && $v.taxRate.state.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.state.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-postcode">Postcode</label>
            <input
              type="text"
              class="form-control"
              name="postcode"
              id="tax-rate-postcode"
              data-cy="postcode"
              :class="{ valid: !$v.taxRate.postcode.$invalid, invalid: $v.taxRate.postcode.$invalid }"
              v-model="$v.taxRate.postcode.$model"
              required
            />
            <div v-if="$v.taxRate.postcode.$anyDirty && $v.taxRate.postcode.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.postcode.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="tax-rate-city"
              data-cy="city"
              :class="{ valid: !$v.taxRate.city.$invalid, invalid: $v.taxRate.city.$invalid }"
              v-model="$v.taxRate.city.$model"
              required
            />
            <div v-if="$v.taxRate.city.$anyDirty && $v.taxRate.city.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.city.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-rate">Rate</label>
            <input
              type="text"
              class="form-control"
              name="rate"
              id="tax-rate-rate"
              data-cy="rate"
              :class="{ valid: !$v.taxRate.rate.$invalid, invalid: $v.taxRate.rate.$invalid }"
              v-model="$v.taxRate.rate.$model"
              required
            />
            <div v-if="$v.taxRate.rate.$anyDirty && $v.taxRate.rate.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.rate.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="tax-rate-name"
              data-cy="name"
              :class="{ valid: !$v.taxRate.name.$invalid, invalid: $v.taxRate.name.$invalid }"
              v-model="$v.taxRate.name.$model"
              required
            />
            <div v-if="$v.taxRate.name.$anyDirty && $v.taxRate.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-shipping">Shipping</label>
            <input
              type="checkbox"
              class="form-check"
              name="shipping"
              id="tax-rate-shipping"
              data-cy="shipping"
              :class="{ valid: !$v.taxRate.shipping.$invalid, invalid: $v.taxRate.shipping.$invalid }"
              v-model="$v.taxRate.shipping.$model"
              required
            />
            <div v-if="$v.taxRate.shipping.$anyDirty && $v.taxRate.shipping.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.shipping.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-compound">Compound</label>
            <input
              type="checkbox"
              class="form-check"
              name="compound"
              id="tax-rate-compound"
              data-cy="compound"
              :class="{ valid: !$v.taxRate.compound.$invalid, invalid: $v.taxRate.compound.$invalid }"
              v-model="$v.taxRate.compound.$model"
              required
            />
            <div v-if="$v.taxRate.compound.$anyDirty && $v.taxRate.compound.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.compound.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-priority">Priority</label>
            <input
              type="number"
              class="form-control"
              name="priority"
              id="tax-rate-priority"
              data-cy="priority"
              :class="{ valid: !$v.taxRate.priority.$invalid, invalid: $v.taxRate.priority.$invalid }"
              v-model.number="$v.taxRate.priority.$model"
              required
            />
            <div v-if="$v.taxRate.priority.$anyDirty && $v.taxRate.priority.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxRate.priority.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.taxRate.priority.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-rate-taxClass">Tax Class</label>
            <select class="form-control" id="tax-rate-taxClass" data-cy="taxClass" name="taxClass" v-model="taxRate.taxClass" required>
              <option v-if="!taxRate.taxClass" v-bind:value="null" selected></option>
              <option
                v-bind:value="taxRate.taxClass && taxClassOption.id === taxRate.taxClass.id ? taxRate.taxClass : taxClassOption"
                v-for="taxClassOption in taxClasses"
                :key="taxClassOption.id"
              >
                {{ taxClassOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.taxRate.taxClass.$anyDirty && $v.taxRate.taxClass.$invalid">
            <small class="form-text text-danger" v-if="!$v.taxRate.taxClass.required"> This field is required. </small>
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
            :disabled="$v.taxRate.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./tax-rate-update.component.ts"></script>
