/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductAttributeTermDetailComponent from '@/entities/product-attribute-term/product-attribute-term-details.vue';
import ProductAttributeTermClass from '@/entities/product-attribute-term/product-attribute-term-details.component';
import ProductAttributeTermService from '@/entities/product-attribute-term/product-attribute-term.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductAttributeTerm Management Detail Component', () => {
    let wrapper: Wrapper<ProductAttributeTermClass>;
    let comp: ProductAttributeTermClass;
    let productAttributeTermServiceStub: SinonStubbedInstance<ProductAttributeTermService>;

    beforeEach(() => {
      productAttributeTermServiceStub = sinon.createStubInstance<ProductAttributeTermService>(ProductAttributeTermService);

      wrapper = shallowMount<ProductAttributeTermClass>(ProductAttributeTermDetailComponent, {
        store,
        localVue,
        router,
        provide: { productAttributeTermService: () => productAttributeTermServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductAttributeTerm = { id: 123 };
        productAttributeTermServiceStub.find.resolves(foundProductAttributeTerm);

        // WHEN
        comp.retrieveProductAttributeTerm(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productAttributeTerm).toBe(foundProductAttributeTerm);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductAttributeTerm = { id: 123 };
        productAttributeTermServiceStub.find.resolves(foundProductAttributeTerm);

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
