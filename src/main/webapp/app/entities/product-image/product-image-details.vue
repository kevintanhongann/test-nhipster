<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productImage">
        <h2 class="jh-entity-heading" data-cy="productImageDetailsHeading"><span>ProductImage</span> {{ productImage.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Filename</span>
          </dt>
          <dd>
            <span>{{ productImage.filename }}</span>
          </dd>
          <dt>
            <span>Url</span>
          </dt>
          <dd>
            <span>{{ productImage.url }}</span>
          </dd>
          <dt>
            <span>Mime Type</span>
          </dt>
          <dd>
            <span>{{ productImage.mimeType }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productImage.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productImage.product.id } }">{{
                productImage.product.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productImage.id"
          :to="{ name: 'ProductImageEdit', params: { productImageId: productImage.id } }"
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

<script lang="ts" src="./product-image-details.component.ts"></script>
