<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productShippingClass">
        <h2 class="jh-entity-heading" data-cy="productShippingClassDetailsHeading">
          <span>ProductShippingClass</span> {{ productShippingClass.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ productShippingClass.name }}</span>
          </dd>
          <dt>
            <span>Slug</span>
          </dt>
          <dd>
            <span>{{ productShippingClass.slug }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ productShippingClass.description }}</span>
          </dd>
          <dt>
            <span>Count</span>
          </dt>
          <dd>
            <span>{{ productShippingClass.count }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productShippingClass.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productShippingClass.product.id } }">{{
                productShippingClass.product.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productShippingClass.id"
          :to="{ name: 'ProductShippingClassEdit', params: { productShippingClassId: productShippingClass.id } }"
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

<script lang="ts" src="./product-shipping-class-details.component.ts"></script>
