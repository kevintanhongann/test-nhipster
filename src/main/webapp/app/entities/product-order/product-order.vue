<template>
  <div>
    <h2 id="page-heading" data-cy="ProductOrderHeading">
      <span id="product-order-heading">Product Orders</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProductOrderCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-product-order"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Product Order </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && productOrders && productOrders.length === 0">
      <span>No productOrders found</span>
    </div>
    <div class="table-responsive" v-if="productOrders && productOrders.length > 0">
      <table class="table table-striped" aria-describedby="productOrders">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('placedDate')">
              <span>Placed Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'placedDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('status')">
              <span>Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('code')">
              <span>Code</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'code'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('invoiceId')">
              <span>Invoice Id</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoiceId'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('deliveryOption')">
              <span>Delivery Option</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'deliveryOption'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('transaction.code')">
              <span>Transaction</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'transaction.code'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('user.email')">
              <span>User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.email'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="productOrder in productOrders" :key="productOrder.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: productOrder.id } }">{{
                productOrder.id
              }}</router-link>
            </td>
            <td>{{ productOrder.placedDate | formatDate }}</td>
            <td>{{ productOrder.status }}</td>
            <td>{{ productOrder.code }}</td>
            <td>{{ productOrder.invoiceId }}</td>
            <td>{{ productOrder.deliveryOption }}</td>
            <td>
              <div v-if="productOrder.transaction">
                <router-link :to="{ name: 'TransactionView', params: { transactionId: productOrder.transaction.id } }">{{
                  productOrder.transaction.code
                }}</router-link>
              </div>
            </td>
            <td>
              {{ productOrder.user ? productOrder.user.email : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: productOrder.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProductOrderEdit', params: { productOrderId: productOrder.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(productOrder)"
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
        ><span id="nhipstertestApp.productOrder.delete.question" data-cy="productOrderDeleteDialogHeading"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-productOrder-heading">Are you sure you want to delete this Product Order?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-productOrder"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeProductOrder()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="productOrders && productOrders.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-order.component.ts"></script>
