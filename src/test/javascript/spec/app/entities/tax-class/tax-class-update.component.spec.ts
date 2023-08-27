/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import TaxClassUpdateComponent from '@/entities/tax-class/tax-class-update.vue';
import TaxClassClass from '@/entities/tax-class/tax-class-update.component';
import TaxClassService from '@/entities/tax-class/tax-class.service';

import TaxRateService from '@/entities/tax-rate/tax-rate.service';

import ProductService from '@/entities/product/product.service';

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
  describe('TaxClass Management Update Component', () => {
    let wrapper: Wrapper<TaxClassClass>;
    let comp: TaxClassClass;
    let taxClassServiceStub: SinonStubbedInstance<TaxClassService>;

    beforeEach(() => {
      taxClassServiceStub = sinon.createStubInstance<TaxClassService>(TaxClassService);

      wrapper = shallowMount<TaxClassClass>(TaxClassUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          taxClassService: () => taxClassServiceStub,

          taxRateService: () => new TaxRateService(),

          productService: () => new ProductService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.taxClass = entity;
        taxClassServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taxClassServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.taxClass = entity;
        taxClassServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(taxClassServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTaxClass = { id: 123 };
        taxClassServiceStub.find.resolves(foundTaxClass);
        taxClassServiceStub.retrieve.resolves([foundTaxClass]);

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
