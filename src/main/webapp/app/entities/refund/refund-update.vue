<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.refund.home.createOrEditLabel" data-cy="RefundCreateUpdateHeading">Create or edit a Refund</h2>
        <div>
          <div class="form-group" v-if="refund.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="refund.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="refund-amount">Amount</label>
            <input
              type="number"
              class="form-control"
              name="amount"
              id="refund-amount"
              data-cy="amount"
              :class="{ valid: !$v.refund.amount.$invalid, invalid: $v.refund.amount.$invalid }"
              v-model.number="$v.refund.amount.$model"
              required
            />
            <div v-if="$v.refund.amount.$anyDirty && $v.refund.amount.$invalid">
              <small class="form-text text-danger" v-if="!$v.refund.amount.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.refund.amount.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="refund-reason">Reason</label>
            <input
              type="text"
              class="form-control"
              name="reason"
              id="refund-reason"
              data-cy="reason"
              :class="{ valid: !$v.refund.reason.$invalid, invalid: $v.refund.reason.$invalid }"
              v-model="$v.refund.reason.$model"
              required
            />
            <div v-if="$v.refund.reason.$anyDirty && $v.refund.reason.$invalid">
              <small class="form-text text-danger" v-if="!$v.refund.reason.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="refund-orderCode">Order Code</label>
            <input
              type="text"
              class="form-control"
              name="orderCode"
              id="refund-orderCode"
              data-cy="orderCode"
              :class="{ valid: !$v.refund.orderCode.$invalid, invalid: $v.refund.orderCode.$invalid }"
              v-model="$v.refund.orderCode.$model"
              required
            />
            <div v-if="$v.refund.orderCode.$anyDirty && $v.refund.orderCode.$invalid">
              <small class="form-text text-danger" v-if="!$v.refund.orderCode.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="refund-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.refund.status.$invalid, invalid: $v.refund.status.$invalid }"
              v-model="$v.refund.status.$model"
              id="refund-status"
              data-cy="status"
              required
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLETE">COMPLETE</option>
            </select>
            <div v-if="$v.refund.status.$anyDirty && $v.refund.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.refund.status.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="refund-transaction">Transaction</label>
            <select
              class="form-control"
              id="refund-transaction"
              data-cy="transaction"
              name="transaction"
              v-model="refund.transaction"
              required
            >
              <option v-if="!refund.transaction" v-bind:value="null" selected></option>
              <option
                v-bind:value="refund.transaction && transactionOption.id === refund.transaction.id ? refund.transaction : transactionOption"
                v-for="transactionOption in transactions"
                :key="transactionOption.id"
              >
                {{ transactionOption.code }}
              </option>
            </select>
          </div>
          <div v-if="$v.refund.transaction.$anyDirty && $v.refund.transaction.$invalid">
            <small class="form-text text-danger" v-if="!$v.refund.transaction.required"> This field is required. </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="refund-user">User</label>
            <select class="form-control" id="refund-user" data-cy="user" name="user" v-model="refund.user" required>
              <option v-if="!refund.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="refund.user && userOption.id === refund.user.id ? refund.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.email }}
              </option>
            </select>
          </div>
          <div v-if="$v.refund.user.$anyDirty && $v.refund.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.refund.user.required"> This field is required. </small>
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
            :disabled="$v.refund.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./refund-update.component.ts"></script>
