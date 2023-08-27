<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">Create or edit a Product</h2>
        <div>
          <div class="form-group" v-if="product.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="product.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-name"
              data-cy="name"
              :class="{ valid: !$v.product.name.$invalid, invalid: $v.product.name.$invalid }"
              v-model="$v.product.name.$model"
              required
            />
            <div v-if="$v.product.name.$anyDirty && $v.product.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="product-slug"
              data-cy="slug"
              :class="{ valid: !$v.product.slug.$invalid, invalid: $v.product.slug.$invalid }"
              v-model="$v.product.slug.$model"
              required
            />
            <div v-if="$v.product.slug.$anyDirty && $v.product.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.slug.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-skuNumber">Sku Number</label>
            <input
              type="text"
              class="form-control"
              name="skuNumber"
              id="product-skuNumber"
              data-cy="skuNumber"
              :class="{ valid: !$v.product.skuNumber.$invalid, invalid: $v.product.skuNumber.$invalid }"
              v-model="$v.product.skuNumber.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-description"
              data-cy="description"
              :class="{ valid: !$v.product.description.$invalid, invalid: $v.product.description.$invalid }"
              v-model="$v.product.description.$model"
              required
            />
            <div v-if="$v.product.description.$anyDirty && $v.product.description.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.description.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shortDescription">Short Description</label>
            <input
              type="text"
              class="form-control"
              name="shortDescription"
              id="product-shortDescription"
              data-cy="shortDescription"
              :class="{ valid: !$v.product.shortDescription.$invalid, invalid: $v.product.shortDescription.$invalid }"
              v-model="$v.product.shortDescription.$model"
              required
            />
            <div v-if="$v.product.shortDescription.$anyDirty && $v.product.shortDescription.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.shortDescription.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-regularPrice">Regular Price</label>
            <input
              type="number"
              class="form-control"
              name="regularPrice"
              id="product-regularPrice"
              data-cy="regularPrice"
              :class="{ valid: !$v.product.regularPrice.$invalid, invalid: $v.product.regularPrice.$invalid }"
              v-model.number="$v.product.regularPrice.$model"
              required
            />
            <div v-if="$v.product.regularPrice.$anyDirty && $v.product.regularPrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.regularPrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.product.regularPrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-salePrice">Sale Price</label>
            <input
              type="number"
              class="form-control"
              name="salePrice"
              id="product-salePrice"
              data-cy="salePrice"
              :class="{ valid: !$v.product.salePrice.$invalid, invalid: $v.product.salePrice.$invalid }"
              v-model.number="$v.product.salePrice.$model"
              required
            />
            <div v-if="$v.product.salePrice.$anyDirty && $v.product.salePrice.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.salePrice.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.product.salePrice.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-published">Published</label>
            <input
              type="checkbox"
              class="form-check"
              name="published"
              id="product-published"
              data-cy="published"
              :class="{ valid: !$v.product.published.$invalid, invalid: $v.product.published.$invalid }"
              v-model="$v.product.published.$model"
              required
            />
            <div v-if="$v.product.published.$anyDirty && $v.product.published.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.published.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-dateCreated">Date Created</label>
            <div class="d-flex">
              <input
                id="product-dateCreated"
                data-cy="dateCreated"
                type="datetime-local"
                class="form-control"
                name="dateCreated"
                :class="{ valid: !$v.product.dateCreated.$invalid, invalid: $v.product.dateCreated.$invalid }"
                required
                :value="convertDateTimeFromServer($v.product.dateCreated.$model)"
                @change="updateInstantField('dateCreated', $event)"
              />
            </div>
            <div v-if="$v.product.dateCreated.$anyDirty && $v.product.dateCreated.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.dateCreated.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.product.dateCreated.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-dateModified">Date Modified</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="product-dateModified"
                  v-model="$v.product.dateModified.$model"
                  name="dateModified"
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
                id="product-dateModified"
                data-cy="dateModified"
                type="text"
                class="form-control"
                name="dateModified"
                :class="{ valid: !$v.product.dateModified.$invalid, invalid: $v.product.dateModified.$invalid }"
                v-model="$v.product.dateModified.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.product.dateModified.$anyDirty && $v.product.dateModified.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.dateModified.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-featured">Featured</label>
            <input
              type="checkbox"
              class="form-check"
              name="featured"
              id="product-featured"
              data-cy="featured"
              :class="{ valid: !$v.product.featured.$invalid, invalid: $v.product.featured.$invalid }"
              v-model="$v.product.featured.$model"
              required
            />
            <div v-if="$v.product.featured.$anyDirty && $v.product.featured.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.featured.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-taxStatus">Tax Status</label>
            <select
              class="form-control"
              name="taxStatus"
              :class="{ valid: !$v.product.taxStatus.$invalid, invalid: $v.product.taxStatus.$invalid }"
              v-model="$v.product.taxStatus.$model"
              id="product-taxStatus"
              data-cy="taxStatus"
              required
            >
              <option value="TAXABLE">TAXABLE</option>
              <option value="SHIPPING">SHIPPING</option>
              <option value="NONE">NONE</option>
            </select>
            <div v-if="$v.product.taxStatus.$anyDirty && $v.product.taxStatus.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.taxStatus.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-manageStock">Manage Stock</label>
            <input
              type="checkbox"
              class="form-check"
              name="manageStock"
              id="product-manageStock"
              data-cy="manageStock"
              :class="{ valid: !$v.product.manageStock.$invalid, invalid: $v.product.manageStock.$invalid }"
              v-model="$v.product.manageStock.$model"
              required
            />
            <div v-if="$v.product.manageStock.$anyDirty && $v.product.manageStock.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.manageStock.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-stockStatus">Stock Status</label>
            <select
              class="form-control"
              name="stockStatus"
              :class="{ valid: !$v.product.stockStatus.$invalid, invalid: $v.product.stockStatus.$invalid }"
              v-model="$v.product.stockStatus.$model"
              id="product-stockStatus"
              data-cy="stockStatus"
              required
            >
              <option value="IN_STOCK">IN_STOCK</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              <option value="ON_BACKORDER">ON_BACKORDER</option>
            </select>
            <div v-if="$v.product.stockStatus.$anyDirty && $v.product.stockStatus.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.stockStatus.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-soldIndividually">Sold Individually</label>
            <input
              type="checkbox"
              class="form-check"
              name="soldIndividually"
              id="product-soldIndividually"
              data-cy="soldIndividually"
              :class="{ valid: !$v.product.soldIndividually.$invalid, invalid: $v.product.soldIndividually.$invalid }"
              v-model="$v.product.soldIndividually.$model"
              required
            />
            <div v-if="$v.product.soldIndividually.$anyDirty && $v.product.soldIndividually.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.soldIndividually.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-backOrders">Back Orders</label>
            <select
              class="form-control"
              name="backOrders"
              :class="{ valid: !$v.product.backOrders.$invalid, invalid: $v.product.backOrders.$invalid }"
              v-model="$v.product.backOrders.$model"
              id="product-backOrders"
              data-cy="backOrders"
              required
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
              <option value="NOTIFY">NOTIFY</option>
            </select>
            <div v-if="$v.product.backOrders.$anyDirty && $v.product.backOrders.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.backOrders.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-weight">Weight</label>
            <input
              type="number"
              class="form-control"
              name="weight"
              id="product-weight"
              data-cy="weight"
              :class="{ valid: !$v.product.weight.$invalid, invalid: $v.product.weight.$invalid }"
              v-model.number="$v.product.weight.$model"
              required
            />
            <div v-if="$v.product.weight.$anyDirty && $v.product.weight.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.weight.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.product.weight.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-virtual">Virtual</label>
            <input
              type="checkbox"
              class="form-check"
              name="virtual"
              id="product-virtual"
              data-cy="virtual"
              :class="{ valid: !$v.product.virtual.$invalid, invalid: $v.product.virtual.$invalid }"
              v-model="$v.product.virtual.$model"
              required
            />
            <div v-if="$v.product.virtual.$anyDirty && $v.product.virtual.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.virtual.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-downloadable">Downloadable</label>
            <input
              type="checkbox"
              class="form-check"
              name="downloadable"
              id="product-downloadable"
              data-cy="downloadable"
              :class="{ valid: !$v.product.downloadable.$invalid, invalid: $v.product.downloadable.$invalid }"
              v-model="$v.product.downloadable.$model"
              required
            />
            <div v-if="$v.product.downloadable.$anyDirty && $v.product.downloadable.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.downloadable.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-downloadLimit">Download Limit</label>
            <input
              type="number"
              class="form-control"
              name="downloadLimit"
              id="product-downloadLimit"
              data-cy="downloadLimit"
              :class="{ valid: !$v.product.downloadLimit.$invalid, invalid: $v.product.downloadLimit.$invalid }"
              v-model.number="$v.product.downloadLimit.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-downloadExpiry">Download Expiry</label>
            <input
              type="number"
              class="form-control"
              name="downloadExpiry"
              id="product-downloadExpiry"
              data-cy="downloadExpiry"
              :class="{ valid: !$v.product.downloadExpiry.$invalid, invalid: $v.product.downloadExpiry.$invalid }"
              v-model.number="$v.product.downloadExpiry.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shippingRequired">Shipping Required</label>
            <input
              type="checkbox"
              class="form-check"
              name="shippingRequired"
              id="product-shippingRequired"
              data-cy="shippingRequired"
              :class="{ valid: !$v.product.shippingRequired.$invalid, invalid: $v.product.shippingRequired.$invalid }"
              v-model="$v.product.shippingRequired.$model"
              required
            />
            <div v-if="$v.product.shippingRequired.$anyDirty && $v.product.shippingRequired.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.shippingRequired.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-shippingTaxable">Shipping Taxable</label>
            <input
              type="checkbox"
              class="form-check"
              name="shippingTaxable"
              id="product-shippingTaxable"
              data-cy="shippingTaxable"
              :class="{ valid: !$v.product.shippingTaxable.$invalid, invalid: $v.product.shippingTaxable.$invalid }"
              v-model="$v.product.shippingTaxable.$model"
              required
            />
            <div v-if="$v.product.shippingTaxable.$anyDirty && $v.product.shippingTaxable.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.shippingTaxable.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-parentId">Parent Id</label>
            <input
              type="number"
              class="form-control"
              name="parentId"
              id="product-parentId"
              data-cy="parentId"
              :class="{ valid: !$v.product.parentId.$invalid, invalid: $v.product.parentId.$invalid }"
              v-model.number="$v.product.parentId.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-purchaseNote">Purchase Note</label>
            <input
              type="text"
              class="form-control"
              name="purchaseNote"
              id="product-purchaseNote"
              data-cy="purchaseNote"
              :class="{ valid: !$v.product.purchaseNote.$invalid, invalid: $v.product.purchaseNote.$invalid }"
              v-model="$v.product.purchaseNote.$model"
              required
            />
            <div v-if="$v.product.purchaseNote.$anyDirty && $v.product.purchaseNote.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.purchaseNote.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-catalogVisibility">Catalog Visibility</label>
            <select
              class="form-control"
              name="catalogVisibility"
              :class="{ valid: !$v.product.catalogVisibility.$invalid, invalid: $v.product.catalogVisibility.$invalid }"
              v-model="$v.product.catalogVisibility.$model"
              id="product-catalogVisibility"
              data-cy="catalogVisibility"
              required
            >
              <option value="VISIBLE">VISIBLE</option>
              <option value="CATALOG">CATALOG</option>
              <option value="SEARCH">SEARCH</option>
              <option value="HIDDEN">HIDDEN</option>
            </select>
            <div v-if="$v.product.catalogVisibility.$anyDirty && $v.product.catalogVisibility.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.catalogVisibility.required"> This field is required. </small>
            </div>
          </div>
          <div v-if="$v.product.productShippingClass.$anyDirty && $v.product.productShippingClass.$invalid">
            <small class="form-text text-danger" v-if="!$v.product.productShippingClass.required"> This field is required. </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-taxClass">Tax Class</label>
            <select class="form-control" id="product-taxClass" data-cy="taxClass" name="taxClass" v-model="product.taxClass" required>
              <option v-if="!product.taxClass" v-bind:value="null" selected></option>
              <option
                v-bind:value="product.taxClass && taxClassOption.id === product.taxClass.id ? product.taxClass : taxClassOption"
                v-for="taxClassOption in taxClasses"
                :key="taxClassOption.id"
              >
                {{ taxClassOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.product.taxClass.$anyDirty && $v.product.taxClass.$invalid">
            <small class="form-text text-danger" v-if="!$v.product.taxClass.required"> This field is required. </small>
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
            :disabled="$v.product.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-update.component.ts"></script>
