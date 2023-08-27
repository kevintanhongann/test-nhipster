<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="invoice">
        <h2 class="jh-entity-heading" data-cy="invoiceDetailsHeading"><span>Invoice</span> {{ invoice.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ invoice.code }}</span>
          </dd>
          <dt>
            <span>Date</span>
          </dt>
          <dd>
            <span>{{ invoice.date | formatDate }}</span>
          </dd>
          <dt>
            <span>Details</span>
          </dt>
          <dd>
            <span>{{ invoice.details }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ invoice.status }}</span>
          </dd>
          <dt>
            <span>Payment Method</span>
          </dt>
          <dd>
            <span>{{ invoice.paymentMethod }}</span>
          </dd>
          <dt>
            <span>Payment Date</span>
          </dt>
          <dd>
            <span>{{ invoice.paymentDate | formatDate }}</span>
          </dd>
          <dt>
            <span>Payment Amount</span>
          </dt>
          <dd>
            <span>{{ invoice.paymentAmount }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="invoice.id" :to="{ name: 'InvoiceEdit', params: { invoiceId: invoice.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./invoice-details.component.ts"></script>
