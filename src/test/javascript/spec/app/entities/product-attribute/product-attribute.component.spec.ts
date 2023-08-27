/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductAttributeComponent from '@/entities/product-attribute/product-attribute.vue';
import ProductAttributeClass from '@/entities/product-attribute/product-attribute.component';
import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';

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
  describe('ProductAttribute Management Component', () => {
    let wrapper: Wrapper<ProductAttributeClass>;
    let comp: ProductAttributeClass;
    let productAttributeServiceStub: SinonStubbedInstance<ProductAttributeService>;

    beforeEach(() => {
      productAttributeServiceStub = sinon.createStubInstance<ProductAttributeService>(ProductAttributeService);
      productAttributeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductAttributeClass>(ProductAttributeComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          productAttributeService: () => productAttributeServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productAttributeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductAttributes();
      await comp.$nextTick();

      // THEN
      expect(productAttributeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productAttributes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      productAttributeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(productAttributeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productAttributes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      productAttributeServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(productAttributeServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      productAttributeServiceStub.retrieve.reset();
      productAttributeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(productAttributeServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.productAttributes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      productAttributeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProductAttribute();
      await comp.$nextTick();

      // THEN
      expect(productAttributeServiceStub.delete.called).toBeTruthy();
      expect(productAttributeServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
