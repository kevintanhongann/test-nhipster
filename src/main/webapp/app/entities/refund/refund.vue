<template>
  <div>
    <h2 id="page-heading" data-cy="RefundHeading">
      <span id="refund-heading">Refunds</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'RefundCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-refund"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Refund </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && refunds && refunds.length === 0">
      <span>No refunds found</span>
    </div>
    <div class="table-responsive" v-if="refunds && refunds.length > 0">
      <table class="table table-striped" aria-describedby="refunds">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('amount')">
              <span>Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('reason')">
              <span>Reason</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'reason'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('orderCode')">
              <span>Order Code</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'orderCode'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('status')">
              <span>Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator>
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
          <tr v-for="refund in refunds" :key="refund.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RefundView', params: { refundId: refund.id } }">{{ refund.id }}</router-link>
            </td>
            <td>{{ refund.amount }}</td>
            <td>{{ refund.reason }}</td>
            <td>{{ refund.orderCode }}</td>
            <td>{{ refund.status }}</td>
            <td>
              <div v-if="refund.transaction">
                <router-link :to="{ name: 'TransactionView', params: { transactionId: refund.transaction.id } }">{{
                  refund.transaction.code
                }}</router-link>
              </div>
            </td>
            <td>
              {{ refund.user ? refund.user.email : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'RefundView', params: { refundId: refund.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'RefundEdit', params: { refundId: refund.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(refund)"
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
        ><span id="nhipstertestApp.refund.delete.question" data-cy="refundDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-refund-heading">Are you sure you want to delete this Refund?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-refund"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeRefund()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="refunds && refunds.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./refund.component.ts"></script>
