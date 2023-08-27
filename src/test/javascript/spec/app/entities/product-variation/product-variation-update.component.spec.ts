/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductVariationUpdateComponent from '@/entities/product-variation/product-variation-update.vue';
import ProductVariationClass from '@/entities/product-variation/product-variation-update.component';
import ProductVariationService from '@/entities/product-variation/product-variation.service';

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
  describe('ProductVariation Management Update Component', () => {
    let wrapper: Wrapper<ProductVariationClass>;
    let comp: ProductVariationClass;
    let productVariationServiceStub: SinonStubbedInstance<ProductVariationService>;

    beforeEach(() => {
      productVariationServiceStub = sinon.createStubInstance<ProductVariationService>(ProductVariationService);

      wrapper = shallowMount<ProductVariationClass>(ProductVariationUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productVariationService: () => productVariationServiceStub,

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productVariation = entity;
        productVariationServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productVariationServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productVariation = entity;
        productVariationServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productVariationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductVariation = { id: 123 };
        productVariationServiceStub.find.resolves(foundProductVariation);
        productVariationServiceStub.retrieve.resolves([foundProductVariation]);

        // WHEN
        comp.beforeRouteEnter({ params: { productVariationId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productVariation).toBe(foundProductVariation);
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
