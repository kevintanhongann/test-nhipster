<template>
  <b-navbar data-cy="navbar" toggleable="md" type="dark" class="jh-navbar">
    <b-navbar-brand class="logo" b-link to="/">
      <span class="logo-img"></span>
      <span class="navbar-title">nhipstertest</span> <span class="navbar-version">{{ version }}</span>
    </b-navbar-brand>
    <b-navbar-toggle
      right
      class="jh-navbar-toggler d-lg-none"
      href="javascript:void(0);"
      data-toggle="collapse"
      target="header-tabs"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <font-awesome-icon icon="bars" />
    </b-navbar-toggle>

    <b-collapse is-nav id="header-tabs">
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/" exact>
          <span>
            <font-awesome-icon icon="home" />
            <span>Home</span>
          </span>
        </b-nav-item>
        <b-nav-item-dropdown right id="entity-menu" v-if="authenticated" active-class="active" class="pointer" data-cy="entity">
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="th-list" />
            <span class="no-bold">Entities</span>
          </span>
          <b-dropdown-item to="/buyer">
            <font-awesome-icon icon="asterisk" />
            <span>Buyer</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product">
            <font-awesome-icon icon="asterisk" />
            <span>Product</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-image">
            <font-awesome-icon icon="asterisk" />
            <span>Product Image</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-tag">
            <font-awesome-icon icon="asterisk" />
            <span>Product Tag</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-category">
            <font-awesome-icon icon="asterisk" />
            <span>Product Category</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-attribute">
            <font-awesome-icon icon="asterisk" />
            <span>Product Attribute</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-attribute-term">
            <font-awesome-icon icon="asterisk" />
            <span>Product Attribute Term</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-review">
            <font-awesome-icon icon="asterisk" />
            <span>Product Review</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-variation">
            <font-awesome-icon icon="asterisk" />
            <span>Product Variation</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-shipping-class">
            <font-awesome-icon icon="asterisk" />
            <span>Product Shipping Class</span>
          </b-dropdown-item>
          <b-dropdown-item to="/coupon">
            <font-awesome-icon icon="asterisk" />
            <span>Coupon</span>
          </b-dropdown-item>
          <b-dropdown-item to="/item">
            <font-awesome-icon icon="asterisk" />
            <span>Item</span>
          </b-dropdown-item>
          <b-dropdown-item to="/product-order">
            <font-awesome-icon icon="asterisk" />
            <span>Product Order</span>
          </b-dropdown-item>
          <b-dropdown-item to="/address">
            <font-awesome-icon icon="asterisk" />
            <span>Address</span>
          </b-dropdown-item>
          <b-dropdown-item to="/notification">
            <font-awesome-icon icon="asterisk" />
            <span>Notification</span>
          </b-dropdown-item>
          <b-dropdown-item to="/invoice">
            <font-awesome-icon icon="asterisk" />
            <span>Invoice</span>
          </b-dropdown-item>
          <b-dropdown-item to="/transaction">
            <font-awesome-icon icon="asterisk" />
            <span>Transaction</span>
          </b-dropdown-item>
          <b-dropdown-item to="/tax-rate">
            <font-awesome-icon icon="asterisk" />
            <span>Tax Rate</span>
          </b-dropdown-item>
          <b-dropdown-item to="/tax-class">
            <font-awesome-icon icon="asterisk" />
            <span>Tax Class</span>
          </b-dropdown-item>
          <b-dropdown-item to="/refund">
            <font-awesome-icon icon="asterisk" />
            <span>Refund</span>
          </b-dropdown-item>
          <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          right
          id="admin-menu"
          v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated"
          :class="{ 'router-link-active': subIsActive('/admin') }"
          active-class="active"
          class="pointer"
          data-cy="adminMenu"
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="users-cog" />
            <span class="no-bold">Administration</span>
          </span>
          <b-dropdown-item to="/admin/user-management" active-class="active">
            <font-awesome-icon icon="users" />
            <span>User management</span>
          </b-dropdown-item>
          <b-dropdown-item to="/admin/docs" active-class="active">
            <font-awesome-icon icon="book" />
            <span>API</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          right
          href="javascript:void(0);"
          id="account-menu"
          :class="{ 'router-link-active': subIsActive('/account') }"
          active-class="active"
          class="pointer"
          data-cy="accountMenu"
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="user" />
            <span class="no-bold"> Account </span>
          </span>
          <b-dropdown-item data-cy="settings" to="/account/settings" tag="b-dropdown-item" v-if="authenticated" active-class="active">
            <font-awesome-icon icon="wrench" />
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item data-cy="passwordItem" to="/account/password" tag="b-dropdown-item" v-if="authenticated" active-class="active">
            <font-awesome-icon icon="lock" />
            <span>Password</span>
          </b-dropdown-item>
          <b-dropdown-item data-cy="logout" v-if="authenticated" v-on:click="logout()" id="logout" active-class="active">
            <font-awesome-icon icon="sign-out-alt" />
            <span>Sign out</span>
          </b-dropdown-item>
          <b-dropdown-item data-cy="login" v-if="!authenticated" v-on:click="openLogin()" id="login" active-class="active">
            <font-awesome-icon icon="sign-in-alt" />
            <span>Sign in</span>
          </b-dropdown-item>
          <b-dropdown-item
            data-cy="register"
            to="/register"
            tag="b-dropdown-item"
            id="register"
            v-if="!authenticated"
            active-class="active"
          >
            <font-awesome-icon icon="user-plus" />
            <span>Register</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./jhi-navbar.component.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ==========================================================================
      Navbar
      ========================================================================== */
.navbar-version {
  font-size: 10px;
  color: #ccc;
}

.jh-navbar {
  background-color: #353d47;
  padding: 0.2em 1em;
}

.jh-navbar .profile-image {
  margin: -10px 0px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.jh-navbar .dropdown-item.active,
.jh-navbar .dropdown-item.active:focus,
.jh-navbar .dropdown-item.active:hover {
  background-color: #353d47;
}

.jh-navbar .dropdown-toggle::after {
  margin-left: 0.15em;
}

.jh-navbar ul.navbar-nav {
  padding: 0.5em;
}

.jh-navbar .navbar-nav .nav-item {
  margin-left: 1.5rem;
}

.jh-navbar a.nav-link,
.jh-navbar .no-bold {
  font-weight: 400;
}

.jh-navbar .jh-navbar-toggler {
  color: #ccc;
  font-size: 1.5em;
  padding: 10px;
}

.jh-navbar .jh-navbar-toggler:hover {
  color: #fff;
}

@media screen and (min-width: 768px) {
  .jh-navbar-toggler {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1150px) {
  span span {
    display: none;
  }
}

.navbar-title {
  display: inline-block;
  vertical-align: middle;
  color: white;
}

/* ==========================================================================
      Logo styles
      ========================================================================== */
.navbar-brand.logo {
  padding: 5px 15px;
}

.logo .logo-img {
  height: 45px;
  display: inline-block;
  vertical-align: middle;
  width: 70px;
}

.logo-img {
  height: 100%;
  background: url('../../../content/images/logo-jhipster.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  filter: drop-shadow(0 0 0.05rem white);
}
</style>
