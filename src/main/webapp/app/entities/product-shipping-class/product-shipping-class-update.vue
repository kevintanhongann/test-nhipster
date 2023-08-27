<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productShippingClass.home.createOrEditLabel" data-cy="ProductShippingClassCreateUpdateHeading">
          Create or edit a ProductShippingClass
        </h2>
        <div>
          <div class="form-group" v-if="productShippingClass.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productShippingClass.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shipping-class-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-shipping-class-name"
              data-cy="name"
              :class="{ valid: !$v.productShippingClass.name.$invalid, invalid: $v.productShippingClass.name.$invalid }"
              v-model="$v.productShippingClass.name.$model"
              required
            />
            <div v-if="$v.productShippingClass.name.$anyDirty && $v.productShippingClass.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.productShippingClass.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shipping-class-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="product-shipping-class-slug"
              data-cy="slug"
              :class="{ valid: !$v.productShippingClass.slug.$invalid, invalid: $v.productShippingClass.slug.$invalid }"
              v-model="$v.productShippingClass.slug.$model"
              required
            />
            <div v-if="$v.productShippingClass.slug.$anyDirty && $v.productShippingClass.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.productShippingClass.slug.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shipping-class-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-shipping-class-description"
              data-cy="description"
              :class="{ valid: !$v.productShippingClass.description.$invalid, invalid: $v.productShippingClass.description.$invalid }"
              v-model="$v.productShippingClass.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shipping-class-count">Count</label>
            <input
              type="number"
              class="form-control"
              name="count"
              id="product-shipping-class-count"
              data-cy="count"
              :class="{ valid: !$v.productShippingClass.count.$invalid, invalid: $v.productShippingClass.count.$invalid }"
              v-model.number="$v.productShippingClass.count.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shipping-class-product">Product</label>
            <select
              class="form-control"
              id="product-shipping-class-product"
              data-cy="product"
              name="product"
              v-model="productShippingClass.product"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  productShippingClass.product && productOption.id === productShippingClass.product.id
                    ? productShippingClass.product
                    : productOption
                "
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.id }}
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
            :disabled="$v.productShippingClass.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-shipping-class-update.component.ts"></script>
