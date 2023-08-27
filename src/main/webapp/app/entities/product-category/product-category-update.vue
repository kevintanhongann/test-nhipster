<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productCategory.home.createOrEditLabel" data-cy="ProductCategoryCreateUpdateHeading">
          Create or edit a ProductCategory
        </h2>
        <div>
          <div class="form-group" v-if="productCategory.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productCategory.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-category-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-category-name"
              data-cy="name"
              :class="{ valid: !$v.productCategory.name.$invalid, invalid: $v.productCategory.name.$invalid }"
              v-model="$v.productCategory.name.$model"
              required
            />
            <div v-if="$v.productCategory.name.$anyDirty && $v.productCategory.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.productCategory.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-category-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="product-category-slug"
              data-cy="slug"
              :class="{ valid: !$v.productCategory.slug.$invalid, invalid: $v.productCategory.slug.$invalid }"
              v-model="$v.productCategory.slug.$model"
              required
            />
            <div v-if="$v.productCategory.slug.$anyDirty && $v.productCategory.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.productCategory.slug.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-category-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-category-description"
              data-cy="description"
              :class="{ valid: !$v.productCategory.description.$invalid, invalid: $v.productCategory.description.$invalid }"
              v-model="$v.productCategory.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-category-product">Product</label>
            <select class="form-control" id="product-category-product" data-cy="product" name="product" v-model="productCategory.product">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  productCategory.product && productOption.id === productCategory.product.id ? productCategory.product : productOption
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
            :disabled="$v.productCategory.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-category-update.component.ts"></script>
