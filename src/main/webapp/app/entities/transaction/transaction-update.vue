<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.transaction.home.createOrEditLabel" data-cy="TransactionCreateUpdateHeading">
          Create or edit a Transaction
        </h2>
        <div>
          <div class="form-group" v-if="transaction.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="transaction.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="transaction-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="transaction-code"
              data-cy="code"
              :class="{ valid: !$v.transaction.code.$invalid, invalid: $v.transaction.code.$invalid }"
              v-model="$v.transaction.code.$model"
              required
            />
            <div v-if="$v.transaction.code.$anyDirty && $v.transaction.code.$invalid">
              <small class="form-text text-danger" v-if="!$v.transaction.code.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="transaction-amount">Amount</label>
            <input
              type="number"
              class="form-control"
              name="amount"
              id="transaction-amount"
              data-cy="amount"
              :class="{ valid: !$v.transaction.amount.$invalid, invalid: $v.transaction.amount.$invalid }"
              v-model.number="$v.transaction.amount.$model"
              required
            />
            <div v-if="$v.transaction.amount.$anyDirty && $v.transaction.amount.$invalid">
              <small class="form-text text-danger" v-if="!$v.transaction.amount.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.transaction.amount.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="transaction-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.transaction.status.$invalid, invalid: $v.transaction.status.$invalid }"
              v-model="$v.transaction.status.$model"
              id="transaction-status"
              data-cy="status"
              required
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="REJECTED">REJECTED</option>
            </select>
            <div v-if="$v.transaction.status.$anyDirty && $v.transaction.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.transaction.status.required"> This field is required. </small>
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
            :disabled="$v.transaction.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./transaction-update.component.ts"></script>
