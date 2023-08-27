/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductShippingClassComponent from '@/entities/product-shipping-class/product-shipping-class.vue';
import ProductShippingClassClass from '@/entities/product-shipping-class/product-shipping-class.component';
import ProductShippingClassService from '@/entities/product-shipping-class/product-shipping-class.service';

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
  describe('ProductShippingClass Management Component', () => {
    let wrapper: Wrapper<ProductShippingClassClass>;
    let comp: ProductShippingClassClass;
    let productShippingClassServiceStub: SinonStubbedInstance<ProductShippingClassService>;

    beforeEach(() => {
      productShippingClassServiceStub = sinon.createStubInstance<ProductShippingClassService>(ProductShippingClassService);
      productShippingClassServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductShippingClassClass>(ProductShippingClassComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          productShippingClassService: () => productShippingClassServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productShippingClassServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductShippingClasss();
      await comp.$nextTick();

      // THEN
      expect(productShippingClassServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productShippingClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      productShippingClassServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(productShippingClassServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productShippingClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      productShippingClassServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(productShippingClassServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      productShippingClassServiceStub.retrieve.reset();
      productShippingClassServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(productShippingClassServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.productShippingClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      productShippingClassServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProductShippingClass();
      await comp.$nextTick();

      // THEN
      expect(productShippingClassServiceStub.delete.called).toBeTruthy();
      expect(productShippingClassServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
