<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productVariation.home.createOrEditLabel" data-cy="ProductVariationCreateUpdateHeading">
          Create or edit a ProductVariation
        </h2>
        <div>
          <div class="form-group" v-if="productVariation.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productVariation.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-regularPrice">Regular Price</label>
            <input
              type="number"
              class="form-control"
              name="regularPrice"
              id="product-variation-regularPrice"
              data-cy="regularPrice"
              :class="{ valid: !$v.productVariation.regularPrice.$invalid, invalid: $v.productVariation.regularPrice.$invalid }"
              v-model.number="$v.productVariation.regularPrice.$model"
              required
            />
            <div v-if="$v.productVariation.regularPrice.$anyDirty && $v.productVariation.regularPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.productVariation.regularPrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productVariation.regularPrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-salePrice">Sale Price</label>
            <input
              type="number"
              class="form-control"
              name="salePrice"
              id="product-variation-salePrice"
              data-cy="salePrice"
              :class="{ valid: !$v.productVariation.salePrice.$invalid, invalid: $v.productVariation.salePrice.$invalid }"
              v-model.number="$v.productVariation.salePrice.$model"
              required
            />
            <div v-if="$v.productVariation.salePrice.$anyDirty && $v.productVariation.salePrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.productVariation.salePrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productVariation.salePrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-dateOnSaleFrom">Date On Sale From</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="product-variation-dateOnSaleFrom"
                  v-model="$v.productVariation.dateOnSaleFrom.$model"
                  name="dateOnSaleFrom"
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
                id="product-variation-dateOnSaleFrom"
                data-cy="dateOnSaleFrom"
                type="text"
                class="form-control"
                name="dateOnSaleFrom"
                :class="{ valid: !$v.productVariation.dateOnSaleFrom.$invalid, invalid: $v.productVariation.dateOnSaleFrom.$invalid }"
                v-model="$v.productVariation.dateOnSaleFrom.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.productVariation.dateOnSaleFrom.$anyDirty && $v.productVariation.dateOnSaleFrom.$invalid">
              <small class="form-text text-danger" v-if="!$v.productVariation.dateOnSaleFrom.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-dateOnSaleTo">Date On Sale To</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="product-variation-dateOnSaleTo"
                  v-model="$v.productVariation.dateOnSaleTo.$model"
                  name="dateOnSaleTo"
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
                id="product-variation-dateOnSaleTo"
                data-cy="dateOnSaleTo"
                type="text"
                class="form-control"
                name="dateOnSaleTo"
                :class="{ valid: !$v.productVariation.dateOnSaleTo.$invalid, invalid: $v.productVariation.dateOnSaleTo.$invalid }"
                v-model="$v.productVariation.dateOnSaleTo.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.productVariation.dateOnSaleTo.$anyDirty && $v.productVariation.dateOnSaleTo.$invalid">
              <small class="form-text text-danger" v-if="!$v.productVariation.dateOnSaleTo.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-virtual">Virtual</label>
            <input
              type="checkbox"
              class="form-check"
              name="virtual"
              id="product-variation-virtual"
              data-cy="virtual"
              :class="{ valid: !$v.productVariation.virtual.$invalid, invalid: $v.productVariation.virtual.$invalid }"
              v-model="$v.productVariation.virtual.$model"
              required
            />
            <div v-if="$v.productVariation.virtual.$anyDirty && $v.productVariation.virtual.$invalid">
              <small class="form-text text-danger" v-if="!$v.productVariation.virtual.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-downloadable">Downloadable</label>
            <input
              type="checkbox"
              class="form-check"
              name="downloadable"
              id="product-variation-downloadable"
              data-cy="downloadable"
              :class="{ valid: !$v.productVariation.downloadable.$invalid, invalid: $v.productVariation.downloadable.$invalid }"
              v-model="$v.productVariation.downloadable.$model"
              required
            />
            <div v-if="$v.productVariation.downloadable.$anyDirty && $v.productVariation.downloadable.$invalid">
              <small class="form-text text-danger" v-if="!$v.productVariation.downloadable.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-variation-product">Product</label>
            <select
              class="form-control"
              id="product-variation-product"
              data-cy="product"
              name="product"
              v-model="productVariation.product"
              required
            >
              <option v-if="!productVariation.product" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  productVariation.product && productOption.id === productVariation.product.id ? productVariation.product : productOption
                "
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.productVariation.product.$anyDirty && $v.productVariation.product.$invalid">
            <small class="form-text text-danger" v-if="!$v.productVariation.product.required"> This field is required. </small>
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
            :disabled="$v.productVariation.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-variation-update.component.ts"></script>
