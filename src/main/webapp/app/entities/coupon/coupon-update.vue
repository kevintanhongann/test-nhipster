<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.coupon.home.createOrEditLabel" data-cy="CouponCreateUpdateHeading">Create or edit a Coupon</h2>
        <div>
          <div class="form-group" v-if="coupon.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="coupon.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="coupon-code"
              data-cy="code"
              :class="{ valid: !$v.coupon.code.$invalid, invalid: $v.coupon.code.$invalid }"
              v-model="$v.coupon.code.$model"
              required
            />
            <div v-if="$v.coupon.code.$anyDirty && $v.coupon.code.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.code.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-amount">Amount</label>
            <input
              type="number"
              class="form-control"
              name="amount"
              id="coupon-amount"
              data-cy="amount"
              :class="{ valid: !$v.coupon.amount.$invalid, invalid: $v.coupon.amount.$invalid }"
              v-model.number="$v.coupon.amount.$model"
              required
            />
            <div v-if="$v.coupon.amount.$anyDirty && $v.coupon.amount.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.amount.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.coupon.amount.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-discountType">Discount Type</label>
            <select
              class="form-control"
              name="discountType"
              :class="{ valid: !$v.coupon.discountType.$invalid, invalid: $v.coupon.discountType.$invalid }"
              v-model="$v.coupon.discountType.$model"
              id="coupon-discountType"
              data-cy="discountType"
              required
            >
              <option value="PERCENT">PERCENT</option>
              <option value="FIXED_CART">FIXED_CART</option>
              <option value="FIXED_PRODUCT">FIXED_PRODUCT</option>
            </select>
            <div v-if="$v.coupon.discountType.$anyDirty && $v.coupon.discountType.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.discountType.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="coupon-description"
              data-cy="description"
              :class="{ valid: !$v.coupon.description.$invalid, invalid: $v.coupon.description.$invalid }"
              v-model="$v.coupon.description.$model"
              required
            />
            <div v-if="$v.coupon.description.$anyDirty && $v.coupon.description.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.description.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-expiry">Expiry</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="coupon-expiry"
                  v-model="$v.coupon.expiry.$model"
                  name="expiry"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="coupon-expiry"
                data-cy="expiry"
                type="text"
                class="form-control"
                name="expiry"
                :class="{ valid: !$v.coupon.expiry.$invalid, invalid: $v.coupon.expiry.$invalid }"
                v-model="$v.coupon.expiry.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.coupon.expiry.$anyDirty && $v.coupon.expiry.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.expiry.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-individualUse">Individual Use</label>
            <input
              type="checkbox"
              class="form-check"
              name="individualUse"
              id="coupon-individualUse"
              data-cy="individualUse"
              :class="{ valid: !$v.coupon.individualUse.$invalid, invalid: $v.coupon.individualUse.$invalid }"
              v-model="$v.coupon.individualUse.$model"
              required
            />
            <div v-if="$v.coupon.individualUse.$anyDirty && $v.coupon.individualUse.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.individualUse.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-usageLimit">Usage Limit</label>
            <input
              type="number"
              class="form-control"
              name="usageLimit"
              id="coupon-usageLimit"
              data-cy="usageLimit"
              :class="{ valid: !$v.coupon.usageLimit.$invalid, invalid: $v.coupon.usageLimit.$invalid }"
              v-model.number="$v.coupon.usageLimit.$model"
              required
            />
            <div v-if="$v.coupon.usageLimit.$anyDirty && $v.coupon.usageLimit.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.usageLimit.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.coupon.usageLimit.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-usageLimitPerUser">Usage Limit Per User</label>
            <input
              type="number"
              class="form-control"
              name="usageLimitPerUser"
              id="coupon-usageLimitPerUser"
              data-cy="usageLimitPerUser"
              :class="{ valid: !$v.coupon.usageLimitPerUser.$invalid, invalid: $v.coupon.usageLimitPerUser.$invalid }"
              v-model.number="$v.coupon.usageLimitPerUser.$model"
              required
            />
            <div v-if="$v.coupon.usageLimitPerUser.$anyDirty && $v.coupon.usageLimitPerUser.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.usageLimitPerUser.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.coupon.usageLimitPerUser.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-freeShipping">Free Shipping</label>
            <input
              type="checkbox"
              class="form-check"
              name="freeShipping"
              id="coupon-freeShipping"
              data-cy="freeShipping"
              :class="{ valid: !$v.coupon.freeShipping.$invalid, invalid: $v.coupon.freeShipping.$invalid }"
              v-model="$v.coupon.freeShipping.$model"
              required
            />
            <div v-if="$v.coupon.freeShipping.$anyDirty && $v.coupon.freeShipping.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.freeShipping.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-minimumAmount">Minimum Amount</label>
            <input
              type="text"
              class="form-control"
              name="minimumAmount"
              id="coupon-minimumAmount"
              data-cy="minimumAmount"
              :class="{ valid: !$v.coupon.minimumAmount.$invalid, invalid: $v.coupon.minimumAmount.$invalid }"
              v-model="$v.coupon.minimumAmount.$model"
              required
            />
            <div v-if="$v.coupon.minimumAmount.$anyDirty && $v.coupon.minimumAmount.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.minimumAmount.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="coupon-maximumAmount">Maximum Amount</label>
            <input
              type="text"
              class="form-control"
              name="maximumAmount"
              id="coupon-maximumAmount"
              data-cy="maximumAmount"
              :class="{ valid: !$v.coupon.maximumAmount.$invalid, invalid: $v.coupon.maximumAmount.$invalid }"
              v-model="$v.coupon.maximumAmount.$model"
              required
            />
            <div v-if="$v.coupon.maximumAmount.$anyDirty && $v.coupon.maximumAmount.$invalid">
              <small class="form-text text-danger" v-if="!$v.coupon.maximumAmount.required"> This field is required. </small>
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
            :disabled="$v.coupon.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./coupon-update.component.ts"></script>
