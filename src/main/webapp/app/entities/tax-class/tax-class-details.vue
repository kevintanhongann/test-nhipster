<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="taxClass">
        <h2 class="jh-entity-heading" data-cy="taxClassDetailsHeading"><span>TaxClass</span> {{ taxClass.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ taxClass.name }}</span>
          </dd>
          <dt>
            <span>Slug</span>
          </dt>
          <dd>
            <span>{{ taxClass.slug }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="taxClass.id" :to="{ name: 'TaxClassEdit', params: { taxClassId: taxClass.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./tax-class-details.component.ts"></script>
