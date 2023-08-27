<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="nhipstertestApp.productReview.home.createOrEditLabel" data-cy="ProductReviewCreateUpdateHeading">
          Create or edit a ProductReview
        </h2>
        <div>
          <div class="form-group" v-if="productReview.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="productReview.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-review-reviewerName">Reviewer Name</label>
            <input
              type="text"
              class="form-control"
              name="reviewerName"
              id="product-review-reviewerName"
              data-cy="reviewerName"
              :class="{ valid: !$v.productReview.reviewerName.$invalid, invalid: $v.productReview.reviewerName.$invalid }"
              v-model="$v.productReview.reviewerName.$model"
              required
            />
            <div v-if="$v.productReview.reviewerName.$anyDirty && $v.productReview.reviewerName.$invalid">
              <small class="form-text text-danger" v-if="!$v.productReview.reviewerName.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-review-reviewerEmail">Reviewer Email</label>
            <input
              type="text"
              class="form-control"
              name="reviewerEmail"
              id="product-review-reviewerEmail"
              data-cy="reviewerEmail"
              :class="{ valid: !$v.productReview.reviewerEmail.$invalid, invalid: $v.productReview.reviewerEmail.$invalid }"
              v-model="$v.productReview.reviewerEmail.$model"
              required
            />
            <div v-if="$v.productReview.reviewerEmail.$anyDirty && $v.productReview.reviewerEmail.$invalid">
              <small class="form-text text-danger" v-if="!$v.productReview.reviewerEmail.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-review-review">Review</label>
            <input
              type="text"
              class="form-control"
              name="review"
              id="product-review-review"
              data-cy="review"
              :class="{ valid: !$v.productReview.review.$invalid, invalid: $v.productReview.review.$invalid }"
              v-model="$v.productReview.review.$model"
              required
            />
            <div v-if="$v.productReview.review.$anyDirty && $v.productReview.review.$invalid">
              <small class="form-text text-danger" v-if="!$v.productReview.review.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-review-rating">Rating</label>
            <input
              type="number"
              class="form-control"
              name="rating"
              id="product-review-rating"
              data-cy="rating"
              :class="{ valid: !$v.productReview.rating.$invalid, invalid: $v.productReview.rating.$invalid }"
              v-model.number="$v.productReview.rating.$model"
              required
            />
            <div v-if="$v.productReview.rating.$anyDirty && $v.productReview.rating.$invalid">
              <small class="form-text text-danger" v-if="!$v.productReview.rating.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.productReview.rating.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-review-status">Status</label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.productReview.status.$invalid, invalid: $v.productReview.status.$invalid }"
              v-model="$v.productReview.status.$model"
              id="product-review-status"
              data-cy="status"
              required
            >
              <option value="APPROVED">APPROVED</option>
              <option value="HOLD">HOLD</option>
              <option value="SPAM">SPAM</option>
              <option value="UNSPAM">UNSPAM</option>
              <option value="TRASH">TRASH</option>
              <option value="UNTRASH">UNTRASH</option>
            </select>
            <div v-if="$v.productReview.status.$anyDirty && $v.productReview.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.productReview.status.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-review-product">Product</label>
            <select
              class="form-control"
              id="product-review-product"
              data-cy="product"
              name="product"
              v-model="productReview.product"
              required
            >
              <option v-if="!productReview.product" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  productReview.product && productOption.id === productReview.product.id ? productReview.product : productOption
                "
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.productReview.product.$anyDirty && $v.productReview.product.$invalid">
            <small class="form-text text-danger" v-if="!$v.productReview.product.required"> This field is required. </small>
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
            :disabled="$v.productReview.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-review-update.component.ts"></script>
