/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import BuyerUpdateComponent from '@/entities/buyer/buyer-update.vue';
import BuyerClass from '@/entities/buyer/buyer-update.component';
import BuyerService from '@/entities/buyer/buyer.service';

import UserService from '@/admin/user-management/user-management.service';

import AddressService from '@/entities/address/address.service';

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
  describe('Buyer Management Update Component', () => {
    let wrapper: Wrapper<BuyerClass>;
    let comp: BuyerClass;
    let buyerServiceStub: SinonStubbedInstance<BuyerService>;

    beforeEach(() => {
      buyerServiceStub = sinon.createStubInstance<BuyerService>(BuyerService);

      wrapper = shallowMount<BuyerClass>(BuyerUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          buyerService: () => buyerServiceStub,

          userService: () => new UserService(),

          addressService: () => new AddressService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.buyer = entity;
        buyerServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(buyerServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.buyer = entity;
        buyerServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(buyerServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBuyer = { id: 123 };
        buyerServiceStub.find.resolves(foundBuyer);
        buyerServiceStub.retrieve.resolves([foundBuyer]);

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
