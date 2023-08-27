<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="item">
        <h2 class="jh-entity-heading" data-cy="itemDetailsHeading"><span>Item</span> {{ item.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Quantity</span>
          </dt>
          <dd>
            <span>{{ item.quantity }}</span>
          </dd>
          <dt>
            <span>Total Price</span>
          </dt>
          <dd>
            <span>{{ item.totalPrice }}</span>
          </dd>
          <dt>
            <span>Product Order</span>
          </dt>
          <dd>
            <div v-if="item.productOrder">
              <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: item.productOrder.id } }">{{
                item.productOrder.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="item.id" :to="{ name: 'ItemEdit', params: { itemId: item.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./item-details.component.ts"></script>
