/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TaxRateDetailComponent from '@/entities/tax-rate/tax-rate-details.vue';
import TaxRateClass from '@/entities/tax-rate/tax-rate-details.component';
import TaxRateService from '@/entities/tax-rate/tax-rate.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TaxRate Management Detail Component', () => {
    let wrapper: Wrapper<TaxRateClass>;
    let comp: TaxRateClass;
    let taxRateServiceStub: SinonStubbedInstance<TaxRateService>;

    beforeEach(() => {
      taxRateServiceStub = sinon.createStubInstance<TaxRateService>(TaxRateService);

      wrapper = shallowMount<TaxRateClass>(TaxRateDetailComponent, {
        store,
        localVue,
        router,
        provide: { taxRateService: () => taxRateServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTaxRate = { id: 123 };
        taxRateServiceStub.find.resolves(foundTaxRate);

        // WHEN
        comp.retrieveTaxRate(123);
        await comp.$nextTick();

        // THEN
        expect(comp.taxRate).toBe(foundTaxRate);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTaxRate = { id: 123 };
        taxRateServiceStub.find.resolves(foundTaxRate);

        // WHEN
        comp.beforeRouteEnter({ params: { taxRateId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.taxRate).toBe(foundTaxRate);
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
