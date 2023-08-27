/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductAttributeDetailComponent from '@/entities/product-attribute/product-attribute-details.vue';
import ProductAttributeClass from '@/entities/product-attribute/product-attribute-details.component';
import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductAttribute Management Detail Component', () => {
    let wrapper: Wrapper<ProductAttributeClass>;
    let comp: ProductAttributeClass;
    let productAttributeServiceStub: SinonStubbedInstance<ProductAttributeService>;

    beforeEach(() => {
      productAttributeServiceStub = sinon.createStubInstance<ProductAttributeService>(ProductAttributeService);

      wrapper = shallowMount<ProductAttributeClass>(ProductAttributeDetailComponent, {
        store,
        localVue,
        router,
        provide: { productAttributeService: () => productAttributeServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductAttribute = { id: 123 };
        productAttributeServiceStub.find.resolves(foundProductAttribute);

        // WHEN
        comp.retrieveProductAttribute(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productAttribute).toBe(foundProductAttribute);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductAttribute = { id: 123 };
        productAttributeServiceStub.find.resolves(foundProductAttribute);

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
