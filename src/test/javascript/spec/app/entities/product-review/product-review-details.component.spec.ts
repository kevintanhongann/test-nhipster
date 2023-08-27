/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductReviewDetailComponent from '@/entities/product-review/product-review-details.vue';
import ProductReviewClass from '@/entities/product-review/product-review-details.component';
import ProductReviewService from '@/entities/product-review/product-review.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductReview Management Detail Component', () => {
    let wrapper: Wrapper<ProductReviewClass>;
    let comp: ProductReviewClass;
    let productReviewServiceStub: SinonStubbedInstance<ProductReviewService>;

    beforeEach(() => {
      productReviewServiceStub = sinon.createStubInstance<ProductReviewService>(ProductReviewService);

      wrapper = shallowMount<ProductReviewClass>(ProductReviewDetailComponent, {
        store,
        localVue,
        router,
        provide: { productReviewService: () => productReviewServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductReview = { id: 123 };
        productReviewServiceStub.find.resolves(foundProductReview);

        // WHEN
        comp.retrieveProductReview(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productReview).toBe(foundProductReview);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductReview = { id: 123 };
        productReviewServiceStub.find.resolves(foundProductReview);

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
