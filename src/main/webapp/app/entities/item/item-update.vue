<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.item.home.createOrEditLabel" data-cy="ItemCreateUpdateHeading">Create or edit a Item</h2>
        <div>
          <div class="form-group" v-if="item.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="item.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="item-quantity"
              data-cy="quantity"
              :class="{ valid: !$v.item.quantity.$invalid, invalid: $v.item.quantity.$invalid }"
              v-model.number="$v.item.quantity.$model"
              required
            />
            <div v-if="$v.item.quantity.$anyDirty && $v.item.quantity.$invalid">
              <small class="form-text text-danger" v-if="!$v.item.quantity.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.item.quantity.min"> This field should be at least 0. </small>
              <small class="form-text text-danger" v-if="!$v.item.quantity.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-totalPrice">Total Price</label>
            <input
              type="number"
              class="form-control"
              name="totalPrice"
              id="item-totalPrice"
              data-cy="totalPrice"
              :class="{ valid: !$v.item.totalPrice.$invalid, invalid: $v.item.totalPrice.$invalid }"
              v-model.number="$v.item.totalPrice.$model"
              required
            />
            <div v-if="$v.item.totalPrice.$anyDirty && $v.item.totalPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.item.totalPrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.item.totalPrice.min"> This field should be at least 0. </small>
              <small class="form-text text-danger" v-if="!$v.item.totalPrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="item-productOrder">Product Order</label>
            <select class="form-control" id="item-productOrder" data-cy="productOrder" name="productOrder" v-model="item.productOrder">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="item.productOrder && productOrderOption.id === item.productOrder.id ? item.productOrder : productOrderOption"
                v-for="productOrderOption in productOrders"
                :key="productOrderOption.id"
              >
                {{ productOrderOption.id }}
              </option>
            </select>
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
            :disabled="$v.item.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./item-update.component.ts"></script>
