<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="productAttributeTerm">
        <h2 class="jh-entity-heading" data-cy="productAttributeTermDetailsHeading">
          <span>ProductAttributeTerm</span> {{ productAttributeTerm.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ productAttributeTerm.name }}</span>
          </dd>
          <dt>
            <span>Slug</span>
          </dt>
          <dd>
            <span>{{ productAttributeTerm.slug }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ productAttributeTerm.description }}</span>
          </dd>
          <dt>
            <span>Menu Order</span>
          </dt>
          <dd>
            <span>{{ productAttributeTerm.menuOrder }}</span>
          </dd>
          <dt>
            <span>Product Attribute</span>
          </dt>
          <dd>
            <div v-if="productAttributeTerm.productAttribute">
              <router-link
                :to="{ name: 'ProductAttributeView', params: { productAttributeId: productAttributeTerm.productAttribute.id } }"
                >{{ productAttributeTerm.productAttribute.name }}</router-link
              >
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link
          v-if="productAttributeTerm.id"
          :to="{ name: 'ProductAttributeTermEdit', params: { productAttributeTermId: productAttributeTerm.id } }"
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

<script lang="ts" src="./product-attribute-term-details.component.ts"></script>
