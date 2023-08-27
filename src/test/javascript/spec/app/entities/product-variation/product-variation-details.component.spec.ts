/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductVariationDetailComponent from '@/entities/product-variation/product-variation-details.vue';
import ProductVariationClass from '@/entities/product-variation/product-variation-details.component';
import ProductVariationService from '@/entities/product-variation/product-variation.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductVariation Management Detail Component', () => {
    let wrapper: Wrapper<ProductVariationClass>;
    let comp: ProductVariationClass;
    let productVariationServiceStub: SinonStubbedInstance<ProductVariationService>;

    beforeEach(() => {
      productVariationServiceStub = sinon.createStubInstance<ProductVariationService>(ProductVariationService);

      wrapper = shallowMount<ProductVariationClass>(ProductVariationDetailComponent, {
        store,
        localVue,
        router,
        provide: { productVariationService: () => productVariationServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductVariation = { id: 123 };
        productVariationServiceStub.find.resolves(foundProductVariation);

        // WHEN
        comp.retrieveProductVariation(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productVariation).toBe(foundProductVariation);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductVariation = { id: 123 };
        productVariationServiceStub.find.resolves(foundProductVariation);

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
