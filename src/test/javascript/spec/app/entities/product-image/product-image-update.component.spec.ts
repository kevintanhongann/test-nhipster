/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductImageUpdateComponent from '@/entities/product-image/product-image-update.vue';
import ProductImageClass from '@/entities/product-image/product-image-update.component';
import ProductImageService from '@/entities/product-image/product-image.service';

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
  describe('ProductImage Management Update Component', () => {
    let wrapper: Wrapper<ProductImageClass>;
    let comp: ProductImageClass;
    let productImageServiceStub: SinonStubbedInstance<ProductImageService>;

    beforeEach(() => {
      productImageServiceStub = sinon.createStubInstance<ProductImageService>(ProductImageService);

      wrapper = shallowMount<ProductImageClass>(ProductImageUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productImageService: () => productImageServiceStub,

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productImage = entity;
        productImageServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productImageServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productImage = entity;
        productImageServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productImageServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductImage = { id: 123 };
        productImageServiceStub.find.resolves(foundProductImage);
        productImageServiceStub.retrieve.resolves([foundProductImage]);

        // WHEN
        comp.beforeRouteEnter({ params: { productImageId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productImage).toBe(foundProductImage);
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
