<template>
  <div>
    <h2 id="page-heading" data-cy="CouponHeading">
      <span id="coupon-heading">Coupons</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh List</span>
        </button>
        <router-link :to="{ name: 'CouponCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-coupon"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span> Create a new Coupon </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && coupons && coupons.length === 0">
      <span>No coupons found</span>
    </div>
    <div class="table-responsive" v-if="coupons && coupons.length > 0">
      <table class="table table-striped" aria-describedby="coupons">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('code')">
              <span>Code</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'code'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('amount')">
              <span>Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('discountType')">
              <span>Discount Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'discountType'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span>Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('expiry')">
              <span>Expiry</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'expiry'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('individualUse')">
              <span>Individual Use</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'individualUse'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('usageLimit')">
              <span>Usage Limit</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'usageLimit'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('usageLimitPerUser')">
              <span>Usage Limit Per User</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'usageLimitPerUser'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('freeShipping')">
              <span>Free Shipping</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'freeShipping'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('minimumAmount')">
              <span>Minimum Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'minimumAmount'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('maximumAmount')">
              <span>Maximum Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'maximumAmount'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CouponView', params: { couponId: coupon.id } }">{{ coupon.id }}</router-link>
            </td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.amount }}</td>
            <td>{{ coupon.discountType }}</td>
            <td>{{ coupon.description }}</td>
            <td>{{ coupon.expiry }}</td>
            <td>{{ coupon.individualUse }}</td>
            <td>{{ coupon.usageLimit }}</td>
            <td>{{ coupon.usageLimitPerUser }}</td>
            <td>{{ coupon.freeShipping }}</td>
            <td>{{ coupon.minimumAmount }}</td>
            <td>{{ coupon.maximumAmount }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CouponView', params: { couponId: coupon.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CouponEdit', params: { couponId: coupon.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(coupon)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="nhipstertestApp.coupon.delete.question" data-cy="couponDeleteDialogHeading">Confirm delete operation</span></span
      >
      <div class="modal-body">
        <p id="jhi-delete-coupon-heading">Are you sure you want to delete this Coupon?</p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-coupon"
          data-cy="entityConfirmDeleteButton"
          v-on:click="removeCoupon()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="coupons && coupons.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./coupon.component.ts"></script>
