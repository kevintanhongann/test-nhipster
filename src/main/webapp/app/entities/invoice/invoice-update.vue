<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.invoice.home.createOrEditLabel" data-cy="InvoiceCreateUpdateHeading">Create or edit a Invoice</h2>
        <div>
          <div class="form-group" v-if="invoice.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="invoice.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="invoice-code"
              data-cy="code"
              :class="{ valid: !$v.invoice.code.$invalid, invalid: $v.invoice.code.$invalid }"
              v-model="$v.invoice.code.$model"
              required
            />
            <div v-if="$v.invoice.code.$anyDirty && $v.invoice.code.$invalid">
              <small class="form-text text-danger" v-if="!$v.invoice.code.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-date">Date</label>
            <div class="d-flex">
              <input
                id="invoice-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !$v.invoice.date.$invalid, invalid: $v.invoice.date.$invalid }"
                required
                :value="convertDateTimeFromServer($v.invoice.date.$model)"
                @change="updateInstantField('date', $event)"
              />
            </div>
            <div v-if="$v.invoice.date.$anyDirty && $v.invoice.date.$invalid">
              <small class="form-text text-danger" v-if="!$v.invoice.date.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.invoice.date.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-details">Details</label>
            <input
              type="text"
              class="form-control"
              name="details"
              id="invoice-details"
              data-cy="details"
              :class="{ valid: !$v.invoice.details.$invalid, invalid: $v.invoice.details.$invalid }"
              v-model="$v.invoice.details.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.invoice.status.$invalid, invalid: $v.invoice.status.$invalid }"
              v-model="$v.invoice.status.$model"
              id="invoice-status"
              data-cy="status"
              required
            >
              <option value="PAID">PAID</option>
              <option value="ISSUED">ISSUED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <div v-if="$v.invoice.status.$anyDirty && $v.invoice.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.invoice.status.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-paymentMethod">Payment Method</label>
            <select
              class="form-control"
              name="paymentMethod"
              :class="{ valid: !$v.invoice.paymentMethod.$invalid, invalid: $v.invoice.paymentMethod.$invalid }"
              v-model="$v.invoice.paymentMethod.$model"
              id="invoice-paymentMethod"
              data-cy="paymentMethod"
              required
            >
              <option value="DEBIT_CARD">DEBIT_CARD</option>
              <option value="CASH">CASH</option>
              <option value="CREDIT_CARD">CREDIT_CARD</option>
              <option value="PAYPAL">PAYPAL</option>
              <option value="CRYPTO">CRYPTO</option>
            </select>
            <div v-if="$v.invoice.paymentMethod.$anyDirty && $v.invoice.paymentMethod.$invalid">
              <small class="form-text text-danger" v-if="!$v.invoice.paymentMethod.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-paymentDate">Payment Date</label>
            <div class="d-flex">
              <input
                id="invoice-paymentDate"
                data-cy="paymentDate"
                type="datetime-local"
                class="form-control"
                name="paymentDate"
                :class="{ valid: !$v.invoice.paymentDate.$invalid, invalid: $v.invoice.paymentDate.$invalid }"
                required
                :value="convertDateTimeFromServer($v.invoice.paymentDate.$model)"
                @change="updateInstantField('paymentDate', $event)"
              />
            </div>
            <div v-if="$v.invoice.paymentDate.$anyDirty && $v.invoice.paymentDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.invoice.paymentDate.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.invoice.paymentDate.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="invoice-paymentAmount">Payment Amount</label>
            <input
              type="number"
              class="form-control"
              name="paymentAmount"
              id="invoice-paymentAmount"
              data-cy="paymentAmount"
              :class="{ valid: !$v.invoice.paymentAmount.$invalid, invalid: $v.invoice.paymentAmount.$invalid }"
              v-model.number="$v.invoice.paymentAmount.$model"
              required
            />
            <div v-if="$v.invoice.paymentAmount.$anyDirty && $v.invoice.paymentAmount.$invalid">
              <small class="form-text text-danger" v-if="!$v.invoice.paymentAmount.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.invoice.paymentAmount.numeric"> This field should be a number. </small>
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
            :disabled="$v.invoice.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./invoice-update.component.ts"></script>
