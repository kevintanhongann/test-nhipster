<template>
  <div>
    <h2 id="page-heading" data-cy="ItemHeading">
      <span id="item-heading">Items</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ItemCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-item">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Item </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && items && items.length === 0">
      <span>No items found</span>
    </div>
    <div class="table-responsive" v-if="items && items.length > 0">
      <table class="table table-striped" aria-describedby="items">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('quantity')">
              <span>Quantity</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'quantity'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('totalPrice')">
              <span>Total Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'totalPrice'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('productOrder.id')">
              <span>Product Order</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'productOrder.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ItemView', params: { itemId: item.id } }">{{ item.id }}</router-link>
            </td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.totalPrice }}</td>
            <td>
              <div v-if="item.productOrder">
                <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: item.productOrder.id } }">{{
                  item.productOrder.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ItemView', params: { itemId: item.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ItemEdit', params: { itemId: item.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(item)"
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
        ><span id="nhipstertestApp.item.delete.question" data-cy="itemDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-item-heading">Are you sure you want to delete this Item?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-item"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeItem()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="items && items.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./item.component.ts"></script>
