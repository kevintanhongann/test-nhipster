/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductShippingClassDetailComponent from '@/entities/product-shipping-class/product-shipping-class-details.vue';
import ProductShippingClassClass from '@/entities/product-shipping-class/product-shipping-class-details.component';
import ProductShippingClassService from '@/entities/product-shipping-class/product-shipping-class.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductShippingClass Management Detail Component', () => {
    let wrapper: Wrapper<ProductShippingClassClass>;
    let comp: ProductShippingClassClass;
    let productShippingClassServiceStub: SinonStubbedInstance<ProductShippingClassService>;

    beforeEach(() => {
      productShippingClassServiceStub = sinon.createStubInstance<ProductShippingClassService>(ProductShippingClassService);

      wrapper = shallowMount<ProductShippingClassClass>(ProductShippingClassDetailComponent, {
        store,
        localVue,
        router,
        provide: { productShippingClassService: () => productShippingClassServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductShippingClass = { id: 123 };
        productShippingClassServiceStub.find.resolves(foundProductShippingClass);

        // WHEN
        comp.retrieveProductShippingClass(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productShippingClass).toBe(foundProductShippingClass);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductShippingClass = { id: 123 };
        productShippingClassServiceStub.find.resolves(foundProductShippingClass);

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
