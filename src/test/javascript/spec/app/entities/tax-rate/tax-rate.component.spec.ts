/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TaxRateComponent from '@/entities/tax-rate/tax-rate.vue';
import TaxRateClass from '@/entities/tax-rate/tax-rate.component';
import TaxRateService from '@/entities/tax-rate/tax-rate.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('TaxRate Management Component', () => {
    let wrapper: Wrapper<TaxRateClass>;
    let comp: TaxRateClass;
    let taxRateServiceStub: SinonStubbedInstance<TaxRateService>;

    beforeEach(() => {
      taxRateServiceStub = sinon.createStubInstance<TaxRateService>(TaxRateService);
      taxRateServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TaxRateClass>(TaxRateComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          taxRateService: () => taxRateServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      taxRateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTaxRates();
      await comp.$nextTick();

      // THEN
      expect(taxRateServiceStub.retrieve.called).toBeTruthy();
      expect(comp.taxRates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      taxRateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(taxRateServiceStub.retrieve.called).toBeTruthy();
      expect(comp.taxRates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      taxRateServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(taxRateServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      taxRateServiceStub.retrieve.reset();
      taxRateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(taxRateServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.taxRates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      taxRateServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTaxRate();
      await comp.$nextTick();

      // THEN
      expect(taxRateServiceStub.delete.called).toBeTruthy();
      expect(taxRateServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
