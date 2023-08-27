<template>
  <div>
    <h2 id="page-heading" data-cy="ProductHeading">
      <span id="product-heading">Products</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && products && products.length === 0">
      <span>No products found</span>
    </div>
    <div class="table-responsive" v-if="products && products.length > 0">
      <table class="table table-striped" aria-describedby="products">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('slug')">
              <span>Slug</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'slug'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('skuNumber')">
              <span>Sku Number</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'skuNumber'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span>Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('shortDescription')">
              <span>Short Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'shortDescription'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('regularPrice')">
              <span>Regular Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'regularPrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('salePrice')">
              <span>Sale Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'salePrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('published')">
              <span>Published</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'published'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('dateCreated')">
              <span>Date Created</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dateCreated'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('dateModified')">
              <span>Date Modified</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dateModified'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('featured')">
              <span>Featured</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'featured'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('taxStatus')">
              <span>Tax Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'taxStatus'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('manageStock')">
              <span>Manage Stock</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'manageStock'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('stockStatus')">
              <span>Stock Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'stockStatus'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('soldIndividually')">
              <span>Sold Individually</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'soldIndividually'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('backOrders')">
              <span>Back Orders</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'backOrders'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('weight')">
              <span>Weight</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'weight'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('virtual')">
              <span>Virtual</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'virtual'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('downloadable')">
              <span>Downloadable</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'downloadable'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('downloadLimit')">
              <span>Download Limit</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'downloadLimit'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('downloadExpiry')">
              <span>Download Expiry</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'downloadExpiry'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('shippingRequired')">
              <span>Shipping Required</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'shippingRequired'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('shippingTaxable')">
              <span>Shipping Taxable</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'shippingTaxable'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('parentId')">
              <span>Parent Id</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'parentId'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('purchaseNote')">
              <span>Purchase Note</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'purchaseNote'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('catalogVisibility')">
              <span>Catalog Visibility</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'catalogVisibility'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('taxClass.name')">
              <span>Tax Class</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'taxClass.name'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductView', params: { productId: product.id } }">{{ product.id }}</router-link>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.slug }}</td>
            <td>{{ product.skuNumber }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.shortDescription }}</td>
            <td>{{ product.regularPrice }}</td>
            <td>{{ product.salePrice }}</td>
            <td>{{ product.published }}</td>
            <td>{{ product.dateCreated | formatDate }}</td>
            <td>{{ product.dateModified }}</td>
            <td>{{ product.featured }}</td>
            <td>{{ product.taxStatus }}</td>
            <td>{{ product.manageStock }}</td>
            <td>{{ product.stockStatus }}</td>
            <td>{{ product.soldIndividually }}</td>
            <td>{{ product.backOrders }}</td>
            <td>{{ product.weight }}</td>
            <td>{{ product.virtual }}</td>
            <td>{{ product.downloadable }}</td>
            <td>{{ product.downloadLimit }}</td>
            <td>{{ product.downloadExpiry }}</td>
            <td>{{ product.shippingRequired }}</td>
            <td>{{ product.shippingTaxable }}</td>
            <td>{{ product.parentId }}</td>
            <td>{{ product.purchaseNote }}</td>
            <td>{{ product.catalogVisibility }}</td>
            <td>
              <div v-if="product.taxClass">
                <router-link :to="{ name: 'TaxClassView', params: { taxClassId: product.taxClass.id } }">{{
                  product.taxClass.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProductView', params: { productId: product.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProductEdit', params: { productId: product.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(product)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="nhipstertestApp.product.delete.question" data-cy="productDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-product-heading">Are you sure you want to delete this Product?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-product"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProduct()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="products && products.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product.component.ts"></script>
