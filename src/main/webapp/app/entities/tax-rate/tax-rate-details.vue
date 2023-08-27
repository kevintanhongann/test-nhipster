<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="taxRate">
        <h2 class="jh-entity-heading" data-cy="taxRateDetailsHeading"><span>TaxRate</span> {{ taxRate.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Country</span>
          </dt>
          <dd>
            <span>{{ taxRate.country }}</span>
          </dd>
          <dt>
            <span>State</span>
          </dt>
          <dd>
            <span>{{ taxRate.state }}</span>
          </dd>
          <dt>
            <span>Postcode</span>
          </dt>
          <dd>
            <span>{{ taxRate.postcode }}</span>
          </dd>
          <dt>
            <span>City</span>
          </dt>
          <dd>
            <span>{{ taxRate.city }}</span>
          </dd>
          <dt>
            <span>Rate</span>
          </dt>
          <dd>
            <span>{{ taxRate.rate }}</span>
          </dd>
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ taxRate.name }}</span>
          </dd>
          <dt>
            <span>Shipping</span>
          </dt>
          <dd>
            <span>{{ taxRate.shipping }}</span>
          </dd>
          <dt>
            <span>Compound</span>
          </dt>
          <dd>
            <span>{{ taxRate.compound }}</span>
          </dd>
          <dt>
            <span>Priority</span>
          </dt>
          <dd>
            <span>{{ taxRate.priority }}</span>
          </dd>
          <dt>
            <span>Tax Class</span>
          </dt>
          <dd>
            <div v-if="taxRate.taxClass">
              <router-link :to="{ name: 'TaxClassView', params: { taxClassId: taxRate.taxClass.id } }">{{
                taxRate.taxClass.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="taxRate.id" :to="{ name: 'TaxRateEdit', params: { taxRateId: taxRate.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./tax-rate-details.component.ts"></script>
