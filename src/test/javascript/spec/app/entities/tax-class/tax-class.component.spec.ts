/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TaxClassComponent from '@/entities/tax-class/tax-class.vue';
import TaxClassClass from '@/entities/tax-class/tax-class.component';
import TaxClassService from '@/entities/tax-class/tax-class.service';

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
  describe('TaxClass Management Component', () => {
    let wrapper: Wrapper<TaxClassClass>;
    let comp: TaxClassClass;
    let taxClassServiceStub: SinonStubbedInstance<TaxClassService>;

    beforeEach(() => {
      taxClassServiceStub = sinon.createStubInstance<TaxClassService>(TaxClassService);
      taxClassServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TaxClassClass>(TaxClassComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          taxClassService: () => taxClassServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      taxClassServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTaxClasss();
      await comp.$nextTick();

      // THEN
      expect(taxClassServiceStub.retrieve.called).toBeTruthy();
      expect(comp.taxClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      taxClassServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(taxClassServiceStub.retrieve.called).toBeTruthy();
      expect(comp.taxClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      taxClassServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(taxClassServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      taxClassServiceStub.retrieve.reset();
      taxClassServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(taxClassServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.taxClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      taxClassServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTaxClass();
      await comp.$nextTick();

      // THEN
      expect(taxClassServiceStub.delete.called).toBeTruthy();
      expect(taxClassServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
