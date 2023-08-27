<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.taxClass.home.createOrEditLabel" data-cy="TaxClassCreateUpdateHeading">Create or edit a TaxClass</h2>
        <div>
          <div class="form-group" v-if="taxClass.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="taxClass.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-class-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="tax-class-name"
              data-cy="name"
              :class="{ valid: !$v.taxClass.name.$invalid, invalid: $v.taxClass.name.$invalid }"
              v-model="$v.taxClass.name.$model"
              required
            />
            <div v-if="$v.taxClass.name.$anyDirty && $v.taxClass.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxClass.name.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="tax-class-slug">Slug</label>
            <input
              type="text"
              class="form-control"
              name="slug"
              id="tax-class-slug"
              data-cy="slug"
              :class="{ valid: !$v.taxClass.slug.$invalid, invalid: $v.taxClass.slug.$invalid }"
              v-model="$v.taxClass.slug.$model"
              required
            />
            <div v-if="$v.taxClass.slug.$anyDirty && $v.taxClass.slug.$invalid">
              <small class="form-text text-danger" v-if="!$v.taxClass.slug.required"> This field is required. </small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.taxClass.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./tax-class-update.component.ts"></script>
