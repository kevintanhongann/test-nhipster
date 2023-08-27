/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductImageDetailComponent from '@/entities/product-image/product-image-details.vue';
import ProductImageClass from '@/entities/product-image/product-image-details.component';
import ProductImageService from '@/entities/product-image/product-image.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductImage Management Detail Component', () => {
    let wrapper: Wrapper<ProductImageClass>;
    let comp: ProductImageClass;
    let productImageServiceStub: SinonStubbedInstance<ProductImageService>;

    beforeEach(() => {
      productImageServiceStub = sinon.createStubInstance<ProductImageService>(ProductImageService);

      wrapper = shallowMount<ProductImageClass>(ProductImageDetailComponent, {
        store,
        localVue,
        router,
        provide: { productImageService: () => productImageServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductImage = { id: 123 };
        productImageServiceStub.find.resolves(foundProductImage);

        // WHEN
        comp.retrieveProductImage(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productImage).toBe(foundProductImage);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductImage = { id: 123 };
        productImageServiceStub.find.resolves(foundProductImage);

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
