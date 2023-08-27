<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productOrder">
        <h2 class="jh-entity-heading" data-cy="productOrderDetailsHeading"><span>ProductOrder</span> {{ productOrder.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Placed Date</span>
          </dt>
          <dd>
            <span>{{ productOrder.placedDate | formatDate }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ productOrder.status }}</span>
          </dd>
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ productOrder.code }}</span>
          </dd>
          <dt>
            <span>Invoice Id</span>
          </dt>
          <dd>
            <span>{{ productOrder.invoiceId }}</span>
          </dd>
          <dt>
            <span>Delivery Option</span>
          </dt>
          <dd>
            <span>{{ productOrder.deliveryOption }}</span>
          </dd>
          <dt>
            <span>Transaction</span>
          </dt>
          <dd>
            <div v-if="productOrder.transaction">
              <router-link :to="{ name: 'TransactionView', params: { transactionId: productOrder.transaction.id } }">{{
                productOrder.transaction.code
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>User</span>
          </dt>
          <dd>
            {{ productOrder.user ? productOrder.user.email : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productOrder.id"
          :to="{ name: 'ProductOrderEdit', params: { productOrderId: productOrder.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-order-details.component.ts"></script>
