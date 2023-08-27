<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productTag">
        <h2 class="jh-entity-heading" data-cy="productTagDetailsHeading"><span>ProductTag</span> {{ productTag.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ productTag.name }}</span>
          </dd>
          <dt>
            <span>Slug</span>
          </dt>
          <dd>
            <span>{{ productTag.slug }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ productTag.description }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productTag.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productTag.product.id } }">{{
                productTag.product.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productTag.id"
          :to="{ name: 'ProductTagEdit', params: { productTagId: productTag.id } }"
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

<script lang="ts" src="./product-tag-details.component.ts"></script>
