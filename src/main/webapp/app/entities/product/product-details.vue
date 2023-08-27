<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="product">
        <h2 class="jh-entity-heading" data-cy="productDetailsHeading"><span>Product</span> {{ product.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ product.name }}</span>
          </dd>
          <dt>
            <span>Slug</span>
          </dt>
          <dd>
            <span>{{ product.slug }}</span>
          </dd>
          <dt>
            <span>Sku Number</span>
          </dt>
          <dd>
            <span>{{ product.skuNumber }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ product.description }}</span>
          </dd>
          <dt>
            <span>Short Description</span>
          </dt>
          <dd>
            <span>{{ product.shortDescription }}</span>
          </dd>
          <dt>
            <span>Regular Price</span>
          </dt>
          <dd>
            <span>{{ product.regularPrice }}</span>
          </dd>
          <dt>
            <span>Sale Price</span>
          </dt>
          <dd>
            <span>{{ product.salePrice }}</span>
          </dd>
          <dt>
            <span>Published</span>
          </dt>
          <dd>
            <span>{{ product.published }}</span>
          </dd>
          <dt>
            <span>Date Created</span>
          </dt>
          <dd>
            <span>{{ product.dateCreated | formatDate }}</span>
          </dd>
          <dt>
            <span>Date Modified</span>
          </dt>
          <dd>
            <span>{{ product.dateModified }}</span>
          </dd>
          <dt>
            <span>Featured</span>
          </dt>
          <dd>
            <span>{{ product.featured }}</span>
          </dd>
          <dt>
            <span>Tax Status</span>
          </dt>
          <dd>
            <span>{{ product.taxStatus }}</span>
          </dd>
          <dt>
            <span>Manage Stock</span>
          </dt>
          <dd>
            <span>{{ product.manageStock }}</span>
          </dd>
          <dt>
            <span>Stock Status</span>
          </dt>
          <dd>
            <span>{{ product.stockStatus }}</span>
          </dd>
          <dt>
            <span>Sold Individually</span>
          </dt>
          <dd>
            <span>{{ product.soldIndividually }}</span>
          </dd>
          <dt>
            <span>Back Orders</span>
          </dt>
          <dd>
            <span>{{ product.backOrders }}</span>
          </dd>
          <dt>
            <span>Weight</span>
          </dt>
          <dd>
            <span>{{ product.weight }}</span>
          </dd>
          <dt>
            <span>Virtual</span>
          </dt>
          <dd>
            <span>{{ product.virtual }}</span>
          </dd>
          <dt>
            <span>Downloadable</span>
          </dt>
          <dd>
            <span>{{ product.downloadable }}</span>
          </dd>
          <dt>
            <span>Download Limit</span>
          </dt>
          <dd>
            <span>{{ product.downloadLimit }}</span>
          </dd>
          <dt>
            <span>Download Expiry</span>
          </dt>
          <dd>
            <span>{{ product.downloadExpiry }}</span>
          </dd>
          <dt>
            <span>Shipping Required</span>
          </dt>
          <dd>
            <span>{{ product.shippingRequired }}</span>
          </dd>
          <dt>
            <span>Shipping Taxable</span>
          </dt>
          <dd>
            <span>{{ product.shippingTaxable }}</span>
          </dd>
          <dt>
            <span>Parent Id</span>
          </dt>
          <dd>
            <span>{{ product.parentId }}</span>
          </dd>
          <dt>
            <span>Purchase Note</span>
          </dt>
          <dd>
            <span>{{ product.purchaseNote }}</span>
          </dd>
          <dt>
            <span>Catalog Visibility</span>
          </dt>
          <dd>
            <span>{{ product.catalogVisibility }}</span>
          </dd>
          <dt>
            <span>Tax Class</span>
          </dt>
          <dd>
            <div v-if="product.taxClass">
              <router-link :to="{ name: 'TaxClassView', params: { taxClassId: product.taxClass.id } }">{{
                product.taxClass.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="product.id" :to="{ name: 'ProductEdit', params: { productId: product.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-details.component.ts"></script>
