<template>
  <div>
    <h2 id="page-heading" data-cy="InvoiceHeading">
      <span id="invoice-heading">Invoices</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'InvoiceCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-invoice"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Invoice </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && invoices && invoices.length === 0">
      <span>No invoices found</span>
    </div>
    <div class="table-responsive" v-if="invoices && invoices.length > 0">
      <table class="table table-striped" aria-describedby="invoices">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('code')">
              <span>Code</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'code'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('date')">
              <span>Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('details')">
              <span>Details</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'details'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('status')">
              <span>Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('paymentMethod')">
              <span>Payment Method</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'paymentMethod'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('paymentDate')">
              <span>Payment Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'paymentDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('paymentAmount')">
              <span>Payment Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'paymentAmount'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'InvoiceView', params: { invoiceId: invoice.id } }">{{ invoice.id }}</router-link>
            </td>
            <td>{{ invoice.code }}</td>
            <td>{{ invoice.date | formatDate }}</td>
            <td>{{ invoice.details }}</td>
            <td>{{ invoice.status }}</td>
            <td>{{ invoice.paymentMethod }}</td>
            <td>{{ invoice.paymentDate | formatDate }}</td>
            <td>{{ invoice.paymentAmount }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'InvoiceView', params: { invoiceId: invoice.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'InvoiceEdit', params: { invoiceId: invoice.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(invoice)"
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
        ><span id="nhipstertestApp.invoice.delete.question" data-cy="invoiceDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-invoice-heading">Are you sure you want to delete this Invoice?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-invoice"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeInvoice()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="invoices && invoices.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./invoice.component.ts"></script>
