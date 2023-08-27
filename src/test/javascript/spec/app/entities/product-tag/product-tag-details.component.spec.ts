/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ProductTagDetailComponent from '@/entities/product-tag/product-tag-details.vue';
import ProductTagClass from '@/entities/product-tag/product-tag-details.component';
import ProductTagService from '@/entities/product-tag/product-tag.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductTag Management Detail Component', () => {
    let wrapper: Wrapper<ProductTagClass>;
    let comp: ProductTagClass;
    let productTagServiceStub: SinonStubbedInstance<ProductTagService>;

    beforeEach(() => {
      productTagServiceStub = sinon.createStubInstance<ProductTagService>(ProductTagService);

      wrapper = shallowMount<ProductTagClass>(ProductTagDetailComponent, {
        store,
        localVue,
        router,
        provide: { productTagService: () => productTagServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductTag = { id: 123 };
        productTagServiceStub.find.resolves(foundProductTag);

        // WHEN
        comp.retrieveProductTag(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productTag).toBe(foundProductTag);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProductTag = { id: 123 };
        productTagServiceStub.find.resolves(foundProductTag);

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
