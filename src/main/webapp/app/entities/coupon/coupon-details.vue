<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="coupon">
        <h2 class="jh-entity-heading" data-cy="couponDetailsHeading"><span>Coupon</span> {{ coupon.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Code</span>
          </dt>
          <dd>
            <span>{{ coupon.code }}</span>
          </dd>
          <dt>
            <span>Amount</span>
          </dt>
          <dd>
            <span>{{ coupon.amount }}</span>
          </dd>
          <dt>
            <span>Discount Type</span>
          </dt>
          <dd>
            <span>{{ coupon.discountType }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ coupon.description }}</span>
          </dd>
          <dt>
            <span>Expiry</span>
          </dt>
          <dd>
            <span>{{ coupon.expiry }}</span>
          </dd>
          <dt>
            <span>Individual Use</span>
          </dt>
          <dd>
            <span>{{ coupon.individualUse }}</span>
          </dd>
          <dt>
            <span>Usage Limit</span>
          </dt>
          <dd>
            <span>{{ coupon.usageLimit }}</span>
          </dd>
          <dt>
            <span>Usage Limit Per User</span>
          </dt>
          <dd>
            <span>{{ coupon.usageLimitPerUser }}</span>
          </dd>
          <dt>
            <span>Free Shipping</span>
          </dt>
          <dd>
            <span>{{ coupon.freeShipping }}</span>
          </dd>
          <dt>
            <span>Minimum Amount</span>
          </dt>
          <dd>
            <span>{{ coupon.minimumAmount }}</span>
          </dd>
          <dt>
            <span>Maximum Amount</span>
          </dt>
          <dd>
            <span>{{ coupon.maximumAmount }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="coupon.id" :to="{ name: 'CouponEdit', params: { couponId: coupon.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./coupon-details.component.ts"></script>
