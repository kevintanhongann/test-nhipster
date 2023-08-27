/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductAttributeTermUpdateComponent from '@/entities/product-attribute-term/product-attribute-term-update.vue';
import ProductAttributeTermClass from '@/entities/product-attribute-term/product-attribute-term-update.component';
import ProductAttributeTermService from '@/entities/product-attribute-term/product-attribute-term.service';

import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';

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
  describe('ProductAttributeTerm Management Update Component', () => {
    let wrapper: Wrapper<ProductAttributeTermClass>;
    let comp: ProductAttributeTermClass;
    let productAttributeTermServiceStub: SinonStubbedInstance<ProductAttributeTermService>;

    beforeEach(() => {
      productAttributeTermServiceStub = sinon.createStubInstance<ProductAttributeTermService>(ProductAttributeTermService);

      wrapper = shallowMount<ProductAttributeTermClass>(ProductAttributeTermUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productAttributeTermService: () => productAttributeTermServiceStub,

          productAttributeService: () => new ProductAttributeService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productAttributeTerm = entity;
        productAttributeTermServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productAttributeTermServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productAttributeTerm = entity;
        productAttributeTermServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productAttributeTermServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductAttributeTerm = { id: 123 };
        productAttributeTermServiceStub.find.resolves(foundProductAttributeTerm);
        productAttributeTermServiceStub.retrieve.resolves([foundProductAttributeTerm]);

        // WHEN
        comp.beforeRouteEnter({ params: { productAttributeTermId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productAttributeTerm).toBe(foundProductAttributeTerm);
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
