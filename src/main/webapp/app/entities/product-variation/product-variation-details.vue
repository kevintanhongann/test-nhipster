<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productVariation">
        <h2 class="jh-entity-heading" data-cy="productVariationDetailsHeading"><span>ProductVariation</span> {{ productVariation.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Regular Price</span>
          </dt>
          <dd>
            <span>{{ productVariation.regularPrice }}</span>
          </dd>
          <dt>
            <span>Sale Price</span>
          </dt>
          <dd>
            <span>{{ productVariation.salePrice }}</span>
          </dd>
          <dt>
            <span>Date On Sale From</span>
          </dt>
          <dd>
            <span>{{ productVariation.dateOnSaleFrom }}</span>
          </dd>
          <dt>
            <span>Date On Sale To</span>
          </dt>
          <dd>
            <span>{{ productVariation.dateOnSaleTo }}</span>
          </dd>
          <dt>
            <span>Virtual</span>
          </dt>
          <dd>
            <span>{{ productVariation.virtual }}</span>
          </dd>
          <dt>
            <span>Downloadable</span>
          </dt>
          <dd>
            <span>{{ productVariation.downloadable }}</span>
          </dd>
          <dt>
            <span>Product</span>
          </dt>
          <dd>
            <div v-if="productVariation.product">
              <router-link :to="{ name: 'ProductView', params: { productId: productVariation.product.id } }">{{
                productVariation.product.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productVariation.id"
          :to="{ name: 'ProductVariationEdit', params: { productVariationId: productVariation.id } }"
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

<script lang="ts" src="./product-variation-details.component.ts"></script>
