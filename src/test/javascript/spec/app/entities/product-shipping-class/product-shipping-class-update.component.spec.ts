/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductShippingClassUpdateComponent from '@/entities/product-shipping-class/product-shipping-class-update.vue';
import ProductShippingClassClass from '@/entities/product-shipping-class/product-shipping-class-update.component';
import ProductShippingClassService from '@/entities/product-shipping-class/product-shipping-class.service';

import ProductService from '@/entities/product/product.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('ProductShippingClass Management Update Component', () => {
    let wrapper: Wrapper<ProductShippingClassClass>;
    let comp: ProductShippingClassClass;
    let productShippingClassServiceStub: SinonStubbedInstance<ProductShippingClassService>;

    beforeEach(() => {
      productShippingClassServiceStub = sinon.createStubInstance<ProductShippingClassService>(ProductShippingClassService);

      wrapper = shallowMount<ProductShippingClassClass>(ProductShippingClassUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productShippingClassService: () => productShippingClassServiceStub,

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productShippingClass = entity;
        productShippingClassServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productShippingClassServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productShippingClass = entity;
        productShippingClassServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productShippingClassServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductShippingClass = { id: 123 };
        productShippingClassServiceStub.find.resolves(foundProductShippingClass);
        productShippingClassServiceStub.retrieve.resolves([foundProductShippingClass]);

        // WHEN
        comp.beforeRouteEnter({ params: { productShippingClassId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productShippingClass).toBe(foundProductShippingClass);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
