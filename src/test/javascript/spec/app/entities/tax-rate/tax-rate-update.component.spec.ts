/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import TaxRateUpdateComponent from '@/entities/tax-rate/tax-rate-update.vue';
import TaxRateClass from '@/entities/tax-rate/tax-rate-update.component';
import TaxRateService from '@/entities/tax-rate/tax-rate.service';

import TaxClassService from '@/entities/tax-class/tax-class.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('TaxRate Management Update Component', () => {
    let wrapper: Wrapper<TaxRateClass>;
    let comp: TaxRateClass;
    let taxRateServiceStub: SinonStubbedInstance<TaxRateService>;

    beforeEach(() => {
      taxRateServiceStub = sinon.createStubInstance<TaxRateService>(TaxRateService);

      wrapper = shallowMount<TaxRateClass>(TaxRateUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          taxRateService: () => taxRateServiceStub,

          taxClassService: () => new TaxClassService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.taxRate = entity;
        taxRateServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taxRateServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.taxRate = entity;
        taxRateServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taxRateServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTaxRate = { id: 123 };
        taxRateServiceStub.find.resolves(foundTaxRate);
        taxRateServiceStub.retrieve.resolves([foundTaxRate]);

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
