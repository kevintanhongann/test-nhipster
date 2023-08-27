/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import BuyerDetailComponent from '@/entities/buyer/buyer-details.vue';
import BuyerClass from '@/entities/buyer/buyer-details.component';
import BuyerService from '@/entities/buyer/buyer.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Buyer Management Detail Component', () => {
    let wrapper: Wrapper<BuyerClass>;
    let comp: BuyerClass;
    let buyerServiceStub: SinonStubbedInstance<BuyerService>;

    beforeEach(() => {
      buyerServiceStub = sinon.createStubInstance<BuyerService>(BuyerService);

      wrapper = shallowMount<BuyerClass>(BuyerDetailComponent, {
        store,
        localVue,
        router,
        provide: { buyerService: () => buyerServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBuyer = { id: 123 };
        buyerServiceStub.find.resolves(foundBuyer);

        // WHEN
        comp.retrieveBuyer(123);
        await comp.$nextTick();

        // THEN
        expect(comp.buyer).toBe(foundBuyer);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBuyer = { id: 123 };
        buyerServiceStub.find.resolves(foundBuyer);

        // WHEN
        comp.beforeRouteEnter({ params: { buyerId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.buyer).toBe(foundBuyer);
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
