/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductAttributeUpdateComponent from '@/entities/product-attribute/product-attribute-update.vue';
import ProductAttributeClass from '@/entities/product-attribute/product-attribute-update.component';
import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';

import ProductAttributeTermService from '@/entities/product-attribute-term/product-attribute-term.service';

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
  describe('ProductAttribute Management Update Component', () => {
    let wrapper: Wrapper<ProductAttributeClass>;
    let comp: ProductAttributeClass;
    let productAttributeServiceStub: SinonStubbedInstance<ProductAttributeService>;

    beforeEach(() => {
      productAttributeServiceStub = sinon.createStubInstance<ProductAttributeService>(ProductAttributeService);

      wrapper = shallowMount<ProductAttributeClass>(ProductAttributeUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productAttributeService: () => productAttributeServiceStub,

          productAttributeTermService: () => new ProductAttributeTermService(),

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productAttribute = entity;
        productAttributeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productAttributeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productAttribute = entity;
        productAttributeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productAttributeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductAttribute = { id: 123 };
        productAttributeServiceStub.find.resolves(foundProductAttribute);
        productAttributeServiceStub.retrieve.resolves([foundProductAttribute]);

        // WHEN
        comp.beforeRouteEnter({ params: { productAttributeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productAttribute).toBe(foundProductAttribute);
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
