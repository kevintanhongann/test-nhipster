/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TaxClassDetailComponent from '@/entities/tax-class/tax-class-details.vue';
import TaxClassClass from '@/entities/tax-class/tax-class-details.component';
import TaxClassService from '@/entities/tax-class/tax-class.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TaxClass Management Detail Component', () => {
    let wrapper: Wrapper<TaxClassClass>;
    let comp: TaxClassClass;
    let taxClassServiceStub: SinonStubbedInstance<TaxClassService>;

    beforeEach(() => {
      taxClassServiceStub = sinon.createStubInstance<TaxClassService>(TaxClassService);

      wrapper = shallowMount<TaxClassClass>(TaxClassDetailComponent, {
        store,
        localVue,
        router,
        provide: { taxClassService: () => taxClassServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTaxClass = { id: 123 };
        taxClassServiceStub.find.resolves(foundTaxClass);

        // WHEN
        comp.retrieveTaxClass(123);
        await comp.$nextTick();

        // THEN
        expect(comp.taxClass).toBe(foundTaxClass);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTaxClass = { id: 123 };
        taxClassServiceStub.find.resolves(foundTaxClass);

        // WHEN
        comp.beforeRouteEnter({ params: { taxClassId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.taxClass).toBe(foundTaxClass);
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
