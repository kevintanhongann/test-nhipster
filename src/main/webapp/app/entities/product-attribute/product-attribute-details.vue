<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productAttribute">
        <h2 class="jh-entity-heading" data-cy="productAttributeDetailsHeading"><span>ProductAttribute</span> {{ productAttribute.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ productAttribute.name }}</span>
          </dd>
          <dt>
            <span>Slug</span>
          </dt>
          <dd>
            <span>{{ productAttribute.slug }}</span>
          </dd>
          <dt>
            <span>Type</span>
          </dt>
          <dd>
            <span>{{ productAttribute.type }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productAttribute.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productAttribute.product.id } }">{{
                productAttribute.product.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productAttribute.id"
          :to="{ name: 'ProductAttributeEdit', params: { productAttributeId: productAttribute.id } }"
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

<script lang="ts" src="./product-attribute-details.component.ts"></script>
