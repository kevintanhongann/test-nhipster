<template>
  <div>
    <h2 id="page-heading" data-cy="ProductImageHeading">
      <span id="product-image-heading">Product Images</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductImageCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product-image"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product Image </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productImages && productImages.length === 0">
      <span>No productImages found</span>
    </div>
    <div class="table-responsive" v-if="productImages && productImages.length > 0">
      <table class="table table-striped" aria-describedby="productImages">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('filename')">
              <span>Filename</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'filename'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('url')">
              <span>Url</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'url'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('mimeType')">
              <span>Mime Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'mimeType'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('product.id')">
              <span>Product</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'product.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productImage in productImages" :key="productImage.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductImageView', params: { productImageId: productImage.id } }">{{
                productImage.id
              }}</router-link>
            </td>
            <td>{{ productImage.filename }}</td>
            <td>{{ productImage.url }}</td>
            <td>{{ productImage.mimeType }}</td>
            <td>
              <div v-if="productImage.product">
                <router-link :to="{ name: 'ProductView', params: { productId: productImage.product.id } }">{{
                  productImage.product.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProductImageView', params: { productImageId: productImage.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProductImageEdit', params: { productImageId: productImage.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productImage)"
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
        ><span id="nhipstertestApp.productImage.delete.question" data-cy="productImageDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productImage-heading">Are you sure you want to delete this Product Image?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productImage"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProductImage()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="productImages && productImages.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-image.component.ts"></script>
