<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productOrder.home.createOrEditLabel" data-cy="ProductOrderCreateUpdateHeading">
          Create or edit a ProductOrder
        </h2>
        <div>
          <div class="form-group" v-if="productOrder.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productOrder.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-placedDate">Placed Date</label>
            <div class="d-flex">
              <input
                id="product-order-placedDate"
                data-cy="placedDate"
                type="datetime-local"
                class="form-control"
                name="placedDate"
                :class="{ valid: !$v.productOrder.placedDate.$invalid, invalid: $v.productOrder.placedDate.$invalid }"
                required
                :value="convertDateTimeFromServer($v.productOrder.placedDate.$model)"
                @change="updateInstantField('placedDate', $event)"
              />
            </div>
            <div v-if="$v.productOrder.placedDate.$anyDirty && $v.productOrder.placedDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.placedDate.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productOrder.placedDate.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.productOrder.status.$invalid, invalid: $v.productOrder.status.$invalid }"
              v-model="$v.productOrder.status.$model"
              id="product-order-status"
              data-cy="status"
              required
            >
              <option value="PENDING">PENDING</option>
              <option value="IN_DELIVERY">IN_DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <div v-if="$v.productOrder.status.$anyDirty && $v.productOrder.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.status.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-code">Code</label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="product-order-code"
              data-cy="code"
              :class="{ valid: !$v.productOrder.code.$invalid, invalid: $v.productOrder.code.$invalid }"
              v-model="$v.productOrder.code.$model"
              required
            />
            <div v-if="$v.productOrder.code.$anyDirty && $v.productOrder.code.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.code.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-invoiceId">Invoice Id</label>
            <input
              type="number"
              class="form-control"
              name="invoiceId"
              id="product-order-invoiceId"
              data-cy="invoiceId"
              :class="{ valid: !$v.productOrder.invoiceId.$invalid, invalid: $v.productOrder.invoiceId.$invalid }"
              v-model.number="$v.productOrder.invoiceId.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-deliveryOption">Delivery Option</label>
            <select
              class="form-control"
              name="deliveryOption"
              :class="{ valid: !$v.productOrder.deliveryOption.$invalid, invalid: $v.productOrder.deliveryOption.$invalid }"
              v-model="$v.productOrder.deliveryOption.$model"
              id="product-order-deliveryOption"
              data-cy="deliveryOption"
              required
            >
              <option value="SELF_PICKUP">SELF_PICKUP</option>
              <option value="DELIVERY">DELIVERY</option>
            </select>
            <div v-if="$v.productOrder.deliveryOption.$anyDirty && $v.productOrder.deliveryOption.$invalid">
              <small class="form-text text-danger" v-if="!$v.productOrder.deliveryOption.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-transaction">Transaction</label>
            <select
              class="form-control"
              id="product-order-transaction"
              data-cy="transaction"
              name="transaction"
              v-model="productOrder.transaction"
              required
            >
              <option v-if="!productOrder.transaction" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  productOrder.transaction && transactionOption.id === productOrder.transaction.id
                    ? productOrder.transaction
                    : transactionOption
                "
                v-for="transactionOption in transactions"
                :key="transactionOption.id"
              >
                {{ transactionOption.code }}
              </option>
            </select>
          </div>
          <div v-if="$v.productOrder.transaction.$anyDirty && $v.productOrder.transaction.$invalid">
            <small class="form-text text-danger" v-if="!$v.productOrder.transaction.required"> This field is required. </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-order-user">User</label>
            <select class="form-control" id="product-order-user" data-cy="user" name="user" v-model="productOrder.user" required>
              <option v-if="!productOrder.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="productOrder.user && userOption.id === productOrder.user.id ? productOrder.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.email }}
              </option>
            </select>
          </div>
          <div v-if="$v.productOrder.user.$anyDirty && $v.productOrder.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.productOrder.user.required"> This field is required. </small>
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
            :disabled="$v.productOrder.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-order-update.component.ts"></script>
