/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductTagUpdateComponent from '@/entities/product-tag/product-tag-update.vue';
import ProductTagClass from '@/entities/product-tag/product-tag-update.component';
import ProductTagService from '@/entities/product-tag/product-tag.service';

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
  describe('ProductTag Management Update Component', () => {
    let wrapper: Wrapper<ProductTagClass>;
    let comp: ProductTagClass;
    let productTagServiceStub: SinonStubbedInstance<ProductTagService>;

    beforeEach(() => {
      productTagServiceStub = sinon.createStubInstance<ProductTagService>(ProductTagService);

      wrapper = shallowMount<ProductTagClass>(ProductTagUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productTagService: () => productTagServiceStub,

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productTag = entity;
        productTagServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productTagServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productTag = entity;
        productTagServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productTagServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductTag = { id: 123 };
        productTagServiceStub.find.resolves(foundProductTag);
        productTagServiceStub.retrieve.resolves([foundProductTag]);

        // WHEN
        comp.beforeRouteEnter({ params: { productTagId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productTag).toBe(foundProductTag);
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
