<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productTag.home.createOrEditLabel" data-cy="ProductTagCreateUpdateHeading">Create or edit a ProductTag</h2>
        <div>
          <div class="form-group" v-if="productTag.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productTag.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-tag-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-tag-name"
              data-cy="name"
              :class="{ valid: !$v.productTag.name.$invalid, invalid: $v.productTag.name.$invalid }"
              v-model="$v.productTag.name.$model"
              required
            />
            <div v-if="$v.productTag.name.$anyDirty && $v.productTag.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.productTag.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-tag-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="product-tag-slug"
              data-cy="slug"
              :class="{ valid: !$v.productTag.slug.$invalid, invalid: $v.productTag.slug.$invalid }"
              v-model="$v.productTag.slug.$model"
              required
            />
            <div v-if="$v.productTag.slug.$anyDirty && $v.productTag.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.productTag.slug.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-tag-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-tag-description"
              data-cy="description"
              :class="{ valid: !$v.productTag.description.$invalid, invalid: $v.productTag.description.$invalid }"
              v-model="$v.productTag.description.$model"
              required
            />
            <div v-if="$v.productTag.description.$anyDirty && $v.productTag.description.$invalid">
              <small class="form-text text-danger" v-if="!$v.productTag.description.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-tag-product">Product</label>
            <select class="form-control" id="product-tag-product" data-cy="product" name="product" v-model="productTag.product">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="productTag.product && productOption.id === productTag.product.id ? productTag.product : productOption"
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
            :disabled="$v.productTag.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-tag-update.component.ts"></script>
