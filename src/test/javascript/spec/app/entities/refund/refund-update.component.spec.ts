/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import RefundUpdateComponent from '@/entities/refund/refund-update.vue';
import RefundClass from '@/entities/refund/refund-update.component';
import RefundService from '@/entities/refund/refund.service';

import TransactionService from '@/entities/transaction/transaction.service';

import UserService from '@/admin/user-management/user-management.service';

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
  describe('Refund Management Update Component', () => {
    let wrapper: Wrapper<RefundClass>;
    let comp: RefundClass;
    let refundServiceStub: SinonStubbedInstance<RefundService>;

    beforeEach(() => {
      refundServiceStub = sinon.createStubInstance<RefundService>(RefundService);

      wrapper = shallowMount<RefundClass>(RefundUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          refundService: () => refundServiceStub,

          transactionService: () => new TransactionService(),

          userService: () => new UserService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.refund = entity;
        refundServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(refundServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.refund = entity;
        refundServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(refundServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundRefund = { id: 123 };
        refundServiceStub.find.resolves(foundRefund);
        refundServiceStub.retrieve.resolves([foundRefund]);

        // WHEN
        comp.beforeRouteEnter({ params: { refundId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.refund).toBe(foundRefund);
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
