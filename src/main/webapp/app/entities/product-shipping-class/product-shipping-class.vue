<template>
  <div>
    <h2 id="page-heading" data-cy="ProductShippingClassHeading">
      <span id="product-shipping-class-heading">Product Shipping Classes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductShippingClassCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product-shipping-class"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product Shipping Class </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productShippingClasses && productShippingClasses.length === 0">
      <span>No productShippingClasses found</span>
    </div>
    <div class="table-responsive" v-if="productShippingClasses && productShippingClasses.length > 0">
      <table class="table table-striped" aria-describedby="productShippingClasses">
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
            <th scope="row" v-on:click="changeOrder('description')">
              <span>Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('count')">
              <span>Count</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'count'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('product.id')">
              <span>Product</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'product.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productShippingClass in productShippingClasses" :key="productShippingClass.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductShippingClassView', params: { productShippingClassId: productShippingClass.id } }">{{
                productShippingClass.id
              }}</router-link>
            </td>
            <td>{{ productShippingClass.name }}</td>
            <td>{{ productShippingClass.slug }}</td>
            <td>{{ productShippingClass.description }}</td>
            <td>{{ productShippingClass.count }}</td>
            <td>
              <div v-if="productShippingClass.product">
                <router-link :to="{ name: 'ProductView', params: { productId: productShippingClass.product.id } }">{{
                  productShippingClass.product.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ProductShippingClassView', params: { productShippingClassId: productShippingClass.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ProductShippingClassEdit', params: { productShippingClassId: productShippingClass.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productShippingClass)"
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
        ><span id="nhipstertestApp.productShippingClass.delete.question" data-cy="productShippingClassDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productShippingClass-heading">Are you sure you want to delete this Product Shipping Class?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productShippingClass"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProductShippingClass()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="productShippingClasses && productShippingClasses.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-shipping-class.component.ts"></script>
