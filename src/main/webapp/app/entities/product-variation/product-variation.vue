<template>
  <div>
    <h2 id="page-heading" data-cy="ProductVariationHeading">
      <span id="product-variation-heading">Product Variations</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductVariationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product-variation"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product Variation </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productVariations && productVariations.length === 0">
      <span>No productVariations found</span>
    </div>
    <div class="table-responsive" v-if="productVariations && productVariations.length > 0">
      <table class="table table-striped" aria-describedby="productVariations">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('regularPrice')">
              <span>Regular Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'regularPrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('salePrice')">
              <span>Sale Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'salePrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('dateOnSaleFrom')">
              <span>Date On Sale From</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dateOnSaleFrom'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('dateOnSaleTo')">
              <span>Date On Sale To</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dateOnSaleTo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('virtual')">
              <span>Virtual</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'virtual'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('downloadable')">
              <span>Downloadable</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'downloadable'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('product.name')">
              <span>Product</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'product.name'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productVariation in productVariations" :key="productVariation.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductVariationView', params: { productVariationId: productVariation.id } }">{{
                productVariation.id
              }}</router-link>
            </td>
            <td>{{ productVariation.regularPrice }}</td>
            <td>{{ productVariation.salePrice }}</td>
            <td>{{ productVariation.dateOnSaleFrom }}</td>
            <td>{{ productVariation.dateOnSaleTo }}</td>
            <td>{{ productVariation.virtual }}</td>
            <td>{{ productVariation.downloadable }}</td>
            <td>
              <div v-if="productVariation.product">
                <router-link :to="{ name: 'ProductView', params: { productId: productVariation.product.id } }">{{
                  productVariation.product.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ProductVariationView', params: { productVariationId: productVariation.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ProductVariationEdit', params: { productVariationId: productVariation.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productVariation)"
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
        ><span id="nhipstertestApp.productVariation.delete.question" data-cy="productVariationDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productVariation-heading">Are you sure you want to delete this Product Variation?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productVariation"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProductVariation()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="productVariations && productVariations.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-variation.component.ts"></script>
