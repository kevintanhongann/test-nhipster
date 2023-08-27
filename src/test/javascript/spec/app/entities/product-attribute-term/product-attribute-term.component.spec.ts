/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductAttributeTermComponent from '@/entities/product-attribute-term/product-attribute-term.vue';
import ProductAttributeTermClass from '@/entities/product-attribute-term/product-attribute-term.component';
import ProductAttributeTermService from '@/entities/product-attribute-term/product-attribute-term.service';

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
  describe('ProductAttributeTerm Management Component', () => {
    let wrapper: Wrapper<ProductAttributeTermClass>;
    let comp: ProductAttributeTermClass;
    let productAttributeTermServiceStub: SinonStubbedInstance<ProductAttributeTermService>;

    beforeEach(() => {
      productAttributeTermServiceStub = sinon.createStubInstance<ProductAttributeTermService>(ProductAttributeTermService);
      productAttributeTermServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductAttributeTermClass>(ProductAttributeTermComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          productAttributeTermService: () => productAttributeTermServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productAttributeTermServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductAttributeTerms();
      await comp.$nextTick();

      // THEN
      expect(productAttributeTermServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productAttributeTerms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      productAttributeTermServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(productAttributeTermServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productAttributeTerms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      productAttributeTermServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(productAttributeTermServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      productAttributeTermServiceStub.retrieve.reset();
      productAttributeTermServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(productAttributeTermServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.productAttributeTerms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      productAttributeTermServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProductAttributeTerm();
      await comp.$nextTick();

      // THEN
      expect(productAttributeTermServiceStub.delete.called).toBeTruthy();
      expect(productAttributeTermServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
