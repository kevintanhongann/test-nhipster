<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="address">
        <h2 class="jh-entity-heading" data-cy="addressDetailsHeading"><span>Address</span> {{ address.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Address 1</span>
          </dt>
          <dd>
            <span>{{ address.address1 }}</span>
          </dd>
          <dt>
            <span>Address 2</span>
          </dt>
          <dd>
            <span>{{ address.address2 }}</span>
          </dd>
          <dt>
            <span>City</span>
          </dt>
          <dd>
            <span>{{ address.city }}</span>
          </dd>
          <dt>
            <span>State</span>
          </dt>
          <dd>
            <span>{{ address.state }}</span>
          </dd>
          <dt>
            <span>Country</span>
          </dt>
          <dd>
            <span>{{ address.country }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="address.id" :to="{ name: 'AddressEdit', params: { addressId: address.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./address-details.component.ts"></script>
