<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="buyer">
        <h2 class="jh-entity-heading" data-cy="buyerDetailsHeading"><span>Buyer</span> {{ buyer.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ buyer.name }}</span>
          </dd>
          <dt>
            <span>Phone</span>
          </dt>
          <dd>
            <span>{{ buyer.phone }}</span>
          </dd>
          <dt>
            <span>Avatar Url</span>
          </dt>
          <dd>
            <span>{{ buyer.avatarUrl }}</span>
          </dd>
          <dt>
            <span>User</span>
          </dt>
          <dd>
            {{ buyer.user ? buyer.user.email : '' }}
          </dd>
          <dt>
            <span>Address</span>
          </dt>
          <dd>
            <div v-if="buyer.address">
              <router-link :to="{ name: 'AddressView', params: { addressId: buyer.address.id } }">{{ buyer.address.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="buyer.id" :to="{ name: 'BuyerEdit', params: { buyerId: buyer.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./buyer-details.component.ts"></script>
