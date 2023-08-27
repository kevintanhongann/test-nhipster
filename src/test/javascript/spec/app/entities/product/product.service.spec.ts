/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/shared/date/filters';
import ProductService from '@/entities/product/product.service';
import { Product } from '@/shared/model/product.model';
import { TaxStatus } from '@/shared/model/enumerations/tax-status.model';
import { StockStatus } from '@/shared/model/enumerations/stock-status.model';
import { BackOrders } from '@/shared/model/enumerations/back-orders.model';
import { CatalogVisibility } from '@/shared/model/enumerations/catalog-visibility.model';

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
  describe('Product Service', () => {
    let service: ProductService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new ProductService();
      currentDate = new Date();
      elemDefault = new Product(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        false,
        currentDate,
        currentDate,
        false,
        TaxStatus.TAXABLE,
        false,
        StockStatus.IN_STOCK,
        false,
        BackOrders.YES,
        0,
        false,
        false,
        0,
        0,
        false,
        false,
        0,
        'AAAAAAA',
        CatalogVisibility.VISIBLE
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateModified: dayjs(currentDate).format(DATE_FORMAT),
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

      it('should create a Product', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreated: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateModified: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Product', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Product', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            slug: 'BBBBBB',
            skuNumber: 'BBBBBB',
            description: 'BBBBBB',
            shortDescription: 'BBBBBB',
            regularPrice: 1,
            salePrice: 1,
            published: true,
            dateCreated: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateModified: dayjs(currentDate).format(DATE_FORMAT),
            featured: true,
            taxStatus: 'BBBBBB',
            manageStock: true,
            stockStatus: 'BBBBBB',
            soldIndividually: true,
            backOrders: 'BBBBBB',
            weight: 1,
            virtual: true,
            downloadable: true,
            downloadLimit: 1,
            downloadExpiry: 1,
            shippingRequired: true,
            shippingTaxable: true,
            parentId: 1,
            purchaseNote: 'BBBBBB',
            catalogVisibility: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Product', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Product', async () => {
        const patchObject = Object.assign(
          {
            skuNumber: 'BBBBBB',
            shortDescription: 'BBBBBB',
            regularPrice: 1,
            published: true,
            dateCreated: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateModified: dayjs(currentDate).format(DATE_FORMAT),
            featured: true,
            taxStatus: 'BBBBBB',
            soldIndividually: true,
            backOrders: 'BBBBBB',
            weight: 1,
            downloadLimit: 1,
            downloadExpiry: 1,
            parentId: 1,
            purchaseNote: 'BBBBBB',
            catalogVisibility: 'BBBBBB',
          },
          new Product()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Product', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Product', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            slug: 'BBBBBB',
            skuNumber: 'BBBBBB',
            description: 'BBBBBB',
            shortDescription: 'BBBBBB',
            regularPrice: 1,
            salePrice: 1,
            published: true,
            dateCreated: dayjs(currentDate).format(DATE_TIME_FORMAT),
            dateModified: dayjs(currentDate).format(DATE_FORMAT),
            featured: true,
            taxStatus: 'BBBBBB',
            manageStock: true,
            stockStatus: 'BBBBBB',
            soldIndividually: true,
            backOrders: 'BBBBBB',
            weight: 1,
            virtual: true,
            downloadable: true,
            downloadLimit: 1,
            downloadExpiry: 1,
            shippingRequired: true,
            shippingTaxable: true,
            parentId: 1,
            purchaseNote: 'BBBBBB',
            catalogVisibility: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Product', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Product', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Product', async () => {
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
