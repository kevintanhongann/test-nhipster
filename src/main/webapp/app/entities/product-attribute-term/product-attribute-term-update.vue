<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productAttributeTerm.home.createOrEditLabel" data-cy="ProductAttributeTermCreateUpdateHeading">
          Create or edit a ProductAttributeTerm
        </h2>
        <div>
          <div class="form-group" v-if="productAttributeTerm.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productAttributeTerm.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-term-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-attribute-term-name"
              data-cy="name"
              :class="{ valid: !$v.productAttributeTerm.name.$invalid, invalid: $v.productAttributeTerm.name.$invalid }"
              v-model="$v.productAttributeTerm.name.$model"
              required
            />
            <div v-if="$v.productAttributeTerm.name.$anyDirty && $v.productAttributeTerm.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttributeTerm.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-term-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="product-attribute-term-slug"
              data-cy="slug"
              :class="{ valid: !$v.productAttributeTerm.slug.$invalid, invalid: $v.productAttributeTerm.slug.$invalid }"
              v-model="$v.productAttributeTerm.slug.$model"
              required
            />
            <div v-if="$v.productAttributeTerm.slug.$anyDirty && $v.productAttributeTerm.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttributeTerm.slug.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-term-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-attribute-term-description"
              data-cy="description"
              :class="{ valid: !$v.productAttributeTerm.description.$invalid, invalid: $v.productAttributeTerm.description.$invalid }"
              v-model="$v.productAttributeTerm.description.$model"
              required
            />
            <div v-if="$v.productAttributeTerm.description.$anyDirty && $v.productAttributeTerm.description.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttributeTerm.description.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-term-menuOrder">Menu Order</label>
            <input
              type="number"
              class="form-control"
              name="menuOrder"
              id="product-attribute-term-menuOrder"
              data-cy="menuOrder"
              :class="{ valid: !$v.productAttributeTerm.menuOrder.$invalid, invalid: $v.productAttributeTerm.menuOrder.$invalid }"
              v-model.number="$v.productAttributeTerm.menuOrder.$model"
              required
            />
            <div v-if="$v.productAttributeTerm.menuOrder.$anyDirty && $v.productAttributeTerm.menuOrder.$invalid">
              <small class="form-text text-danger" v-if="!$v.productAttributeTerm.menuOrder.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productAttributeTerm.menuOrder.numeric">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-attribute-term-productAttribute">Product Attribute</label>
            <select
              class="form-control"
              id="product-attribute-term-productAttribute"
              data-cy="productAttribute"
              name="productAttribute"
              v-model="productAttributeTerm.productAttribute"
              required
            >
              <option v-if="!productAttributeTerm.productAttribute" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  productAttributeTerm.productAttribute && productAttributeOption.id === productAttributeTerm.productAttribute.id
                    ? productAttributeTerm.productAttribute
                    : productAttributeOption
                "
                v-for="productAttributeOption in productAttributes"
                :key="productAttributeOption.id"
              >
                {{ productAttributeOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.productAttributeTerm.productAttribute.$anyDirty && $v.productAttributeTerm.productAttribute.$invalid">
            <small class="form-text text-danger" v-if="!$v.productAttributeTerm.productAttribute.required"> This field is required. </small>
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
            :disabled="$v.productAttributeTerm.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-attribute-term-update.component.ts"></script>
