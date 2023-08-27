<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productReview">
        <h2 class="jh-entity-heading" data-cy="productReviewDetailsHeading"><span>ProductReview</span> {{ productReview.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Reviewer Name</span>
          </dt>
          <dd>
            <span>{{ productReview.reviewerName }}</span>
          </dd>
          <dt>
            <span>Reviewer Email</span>
          </dt>
          <dd>
            <span>{{ productReview.reviewerEmail }}</span>
          </dd>
          <dt>
            <span>Review</span>
          </dt>
          <dd>
            <span>{{ productReview.review }}</span>
          </dd>
          <dt>
            <span>Rating</span>
          </dt>
          <dd>
            <span>{{ productReview.rating }}</span>
          </dd>
          <dt>
            <span>Status</span>
          </dt>
          <dd>
            <span>{{ productReview.status }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productReview.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productReview.product.id } }">{{
                productReview.product.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productReview.id"
          :to="{ name: 'ProductReviewEdit', params: { productReviewId: productReview.id } }"
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

<script lang="ts" src="./product-review-details.component.ts"></script>
