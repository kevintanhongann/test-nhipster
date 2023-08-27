/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import ProductReviewUpdateComponent from '@/entities/product-review/product-review-update.vue';
import ProductReviewClass from '@/entities/product-review/product-review-update.component';
import ProductReviewService from '@/entities/product-review/product-review.service';

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
  describe('ProductReview Management Update Component', () => {
    let wrapper: Wrapper<ProductReviewClass>;
    let comp: ProductReviewClass;
    let productReviewServiceStub: SinonStubbedInstance<ProductReviewService>;

    beforeEach(() => {
      productReviewServiceStub = sinon.createStubInstance<ProductReviewService>(ProductReviewService);

      wrapper = shallowMount<ProductReviewClass>(ProductReviewUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          productReviewService: () => productReviewServiceStub,

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.productReview = entity;
        productReviewServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productReviewServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.productReview = entity;
        productReviewServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(productReviewServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductReview = { id: 123 };
        productReviewServiceStub.find.resolves(foundProductReview);
        productReviewServiceStub.retrieve.resolves([foundProductReview]);

        // WHEN
        comp.beforeRouteEnter({ params: { productReviewId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.productReview).toBe(foundProductReview);
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
