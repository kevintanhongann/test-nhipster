<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productImage.home.createOrEditLabel" data-cy="ProductImageCreateUpdateHeading">
          Create or edit a ProductImage
        </h2>
        <div>
          <div class="form-group" v-if="productImage.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productImage.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-image-filename">Filename</label>
            <input
              type="text"
              class="form-control"
              name="filename"
              id="product-image-filename"
              data-cy="filename"
              :class="{ valid: !$v.productImage.filename.$invalid, invalid: $v.productImage.filename.$invalid }"
              v-model="$v.productImage.filename.$model"
              required
            />
            <div v-if="$v.productImage.filename.$anyDirty && $v.productImage.filename.$invalid">
              <small class="form-text text-danger" v-if="!$v.productImage.filename.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-image-url">Url</label>
            <input
              type="text"
              class="form-control"
              name="url"
              id="product-image-url"
              data-cy="url"
              :class="{ valid: !$v.productImage.url.$invalid, invalid: $v.productImage.url.$invalid }"
              v-model="$v.productImage.url.$model"
              required
            />
            <div v-if="$v.productImage.url.$anyDirty && $v.productImage.url.$invalid">
              <small class="form-text text-danger" v-if="!$v.productImage.url.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-image-mimeType">Mime Type</label>
            <input
              type="text"
              class="form-control"
              name="mimeType"
              id="product-image-mimeType"
              data-cy="mimeType"
              :class="{ valid: !$v.productImage.mimeType.$invalid, invalid: $v.productImage.mimeType.$invalid }"
              v-model="$v.productImage.mimeType.$model"
              required
            />
            <div v-if="$v.productImage.mimeType.$anyDirty && $v.productImage.mimeType.$invalid">
              <small class="form-text text-danger" v-if="!$v.productImage.mimeType.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-image-product">Product</label>
            <select class="form-control" id="product-image-product" data-cy="product" name="product" v-model="productImage.product">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="productImage.product && productOption.id === productImage.product.id ? productImage.product : productOption"
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
            :disabled="$v.productImage.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-image-update.component.ts"></script>
