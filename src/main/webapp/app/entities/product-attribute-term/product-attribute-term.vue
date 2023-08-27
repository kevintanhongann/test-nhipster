<template>
  <div>
    <h2 id="page-heading" data-cy="ProductAttributeTermHeading">
      <span id="product-attribute-term-heading">Product Attribute Terms</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductAttributeTermCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product-attribute-term"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product Attribute Term </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productAttributeTerms && productAttributeTerms.length === 0">
      <span>No productAttributeTerms found</span>
    </div>
    <div class="table-responsive" v-if="productAttributeTerms && productAttributeTerms.length > 0">
      <table class="table table-striped" aria-describedby="productAttributeTerms">
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
            <th scope="row" v-on:click="changeOrder('menuOrder')">
              <span>Menu Order</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'menuOrder'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('productAttribute.name')">
              <span>Product Attribute</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'productAttribute.name'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productAttributeTerm in productAttributeTerms" :key="productAttributeTerm.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductAttributeTermView', params: { productAttributeTermId: productAttributeTerm.id } }">{{
                productAttributeTerm.id
              }}</router-link>
            </td>
            <td>{{ productAttributeTerm.name }}</td>
            <td>{{ productAttributeTerm.slug }}</td>
            <td>{{ productAttributeTerm.description }}</td>
            <td>{{ productAttributeTerm.menuOrder }}</td>
            <td>
              <div v-if="productAttributeTerm.productAttribute">
                <router-link
                  :to="{ name: 'ProductAttributeView', params: { productAttributeId: productAttributeTerm.productAttribute.id } }"
                  >{{ productAttributeTerm.productAttribute.name }}</router-link
                >
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ProductAttributeTermView', params: { productAttributeTermId: productAttributeTerm.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ProductAttributeTermEdit', params: { productAttributeTermId: productAttributeTerm.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productAttributeTerm)"
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
        ><span id="nhipstertestApp.productAttributeTerm.delete.question" data-cy="productAttributeTermDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productAttributeTerm-heading">Are you sure you want to delete this Product Attribute Term?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productAttributeTerm"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProductAttributeTerm()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="productAttributeTerms && productAttributeTerms.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-attribute-term.component.ts"></script>
