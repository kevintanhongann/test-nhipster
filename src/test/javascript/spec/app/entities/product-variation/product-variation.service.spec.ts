/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/shared/date/filters';
import ProductVariationService from '@/entities/product-variation/product-variation.service';
import { ProductVariation } from '@/shared/model/product-variation.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('ProductVariation Service', () => {
    let service: ProductVariationService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new ProductVariationService();
      currentDate = new Date();
      elemDefault = new ProductVariation(0, 0, 0, currentDate, currentDate, false, false);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateOnSaleFrom: dayjs(currentDate).format(DATE_FORMAT),
            dateOnSaleTo: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a ProductVariation', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOnSaleFrom: dayjs(currentDate).format(DATE_FORMAT),
            dateOnSaleTo: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateOnSaleFrom: currentDate,
            dateOnSaleTo: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a ProductVariation', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a ProductVariation', async () => {
        const returnedFromService = Object.assign(
          {
            regularPrice: 1,
            salePrice: 1,
            dateOnSaleFrom: dayjs(currentDate).format(DATE_FORMAT),
            dateOnSaleTo: dayjs(currentDate).format(DATE_FORMAT),
            virtual: true,
            downloadable: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOnSaleFrom: currentDate,
            dateOnSaleTo: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a ProductVariation', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a ProductVariation', async () => {
        const patchObject = Object.assign(
          {
            salePrice: 1,
            dateOnSaleFrom: dayjs(currentDate).format(DATE_FORMAT),
            dateOnSaleTo: dayjs(currentDate).format(DATE_FORMAT),
            virtual: true,
            downloadable: true,
          },
          new ProductVariation()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateOnSaleFrom: currentDate,
            dateOnSaleTo: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a ProductVariation', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of ProductVariation', async () => {
        const returnedFromService = Object.assign(
          {
            regularPrice: 1,
            salePrice: 1,
            dateOnSaleFrom: dayjs(currentDate).format(DATE_FORMAT),
            dateOnSaleTo: dayjs(currentDate).format(DATE_FORMAT),
            virtual: true,
            downloadable: true,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateOnSaleFrom: currentDate,
            dateOnSaleTo: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of ProductVariation', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a ProductVariation', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a ProductVariation', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
