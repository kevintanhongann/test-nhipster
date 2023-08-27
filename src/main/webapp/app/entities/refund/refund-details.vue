<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="refund">
        <h2 class="jh-entity-heading" data-cy="refundDetailsHeading"><span>Refund</span> {{ refund.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Amount</span>
          </dt>
          <dd>
            <span>{{ refund.amount }}</span>
          </dd>
          <dt>
            <span>Reason</span>
          </dt>
          <dd>
            <span>{{ refund.reason }}</span>
          </dd>
          <dt>
            <span>Order Code</span>
          </dt>
          <dd>
            <span>{{ refund.orderCode }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ refund.status }}</span>
          </dd>
          <dt>
            <span>Transaction</span>
          </dt>
          <dd>
            <div v-if="refund.transaction">
              <router-link :to="{ name: 'TransactionView', params: { transactionId: refund.transaction.id } }">{{
                refund.transaction.code
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>User</span>
          </dt>
          <dd>
            {{ refund.user ? refund.user.email : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="refund.id" :to="{ name: 'RefundEdit', params: { refundId: refund.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./refund-details.component.ts"></script>
