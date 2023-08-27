<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productAttribute.home.createOrEditLabel" data-cy="ProductAttributeCreateUpdateHeading">
          Create or edit a ProductAttribute
        </h2>
        <div>
          <div class="form-group" v-if="productAttribute.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productAttribute.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-attribute-name"
              data-cy="name"
              :class="{ valid: !$v.productAttribute.name.$invalid, invalid: $v.productAttribute.name.$invalid }"
              v-model="$v.productAttribute.name.$model"
              required
            />
            <div v-if="$v.productAttribute.name.$anyDirty && $v.productAttribute.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttribute.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="product-attribute-slug"
              data-cy="slug"
              :class="{ valid: !$v.productAttribute.slug.$invalid, invalid: $v.productAttribute.slug.$invalid }"
              v-model="$v.productAttribute.slug.$model"
              required
            />
            <div v-if="$v.productAttribute.slug.$anyDirty && $v.productAttribute.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttribute.slug.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-type">Type</label>
            <input
              type="text"
              class="form-control"
              name="type"
              id="product-attribute-type"
              data-cy="type"
              :class="{ valid: !$v.productAttribute.type.$invalid, invalid: $v.productAttribute.type.$invalid }"
              v-model="$v.productAttribute.type.$model"
              required
            />
            <div v-if="$v.productAttribute.type.$anyDirty && $v.productAttribute.type.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttribute.type.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-product">Product</label>
            <select class="form-control" id="product-attribute-product" data-cy="product" name="product" v-model="productAttribute.product">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  productAttribute.product && productOption.id === productAttribute.product.id ? productAttribute.product : productOption
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
            :disabled="$v.productAttribute.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-attribute-update.component.ts"></script>
