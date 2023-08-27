<template>
  <div>
    <h2 id="page-heading" data-cy="TaxRateHeading">
      <span id="tax-rate-heading">Tax Rates</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'TaxRateCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-tax-rate"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Tax Rate </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && taxRates && taxRates.length === 0">
      <span>No taxRates found</span>
    </div>
    <div class="table-responsive" v-if="taxRates && taxRates.length > 0">
      <table class="table table-striped" aria-describedby="taxRates">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('country')">
              <span>Country</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'country'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('state')">
              <span>State</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'state'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('postcode')">
              <span>Postcode</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'postcode'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('city')">
              <span>City</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'city'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('rate')">
              <span>Rate</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span>Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('shipping')">
              <span>Shipping</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'shipping'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('compound')">
              <span>Compound</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'compound'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('priority')">
              <span>Priority</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'priority'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('taxClass.name')">
              <span>Tax Class</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'taxClass.name'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="taxRate in taxRates" :key="taxRate.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TaxRateView', params: { taxRateId: taxRate.id } }">{{ taxRate.id }}</router-link>
            </td>
            <td>{{ taxRate.country }}</td>
            <td>{{ taxRate.state }}</td>
            <td>{{ taxRate.postcode }}</td>
            <td>{{ taxRate.city }}</td>
            <td>{{ taxRate.rate }}</td>
            <td>{{ taxRate.name }}</td>
            <td>{{ taxRate.shipping }}</td>
            <td>{{ taxRate.compound }}</td>
            <td>{{ taxRate.priority }}</td>
            <td>
              <div v-if="taxRate.taxClass">
                <router-link :to="{ name: 'TaxClassView', params: { taxClassId: taxRate.taxClass.id } }">{{
                  taxRate.taxClass.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TaxRateView', params: { taxRateId: taxRate.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TaxRateEdit', params: { taxRateId: taxRate.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(taxRate)"
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
        ><span id="nhipstertestApp.taxRate.delete.question" data-cy="taxRateDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-taxRate-heading">Are you sure you want to delete this Tax Rate?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-taxRate"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeTaxRate()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="taxRates && taxRates.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./tax-rate.component.ts"></script>
