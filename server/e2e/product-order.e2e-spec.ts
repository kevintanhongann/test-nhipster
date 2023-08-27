import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProductOrderDTO } from '../src/service/dto/product-order.dto';
import { ProductOrderService } from '../src/service/product-order.service';

describe('ProductOrder Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(ProductOrderService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all product-orders ', async () => {
        const getEntities: ProductOrderDTO[] = (
            await request(app.getHttpServer()).get('/api/product-orders').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET product-orders by id', async () => {
        const getEntity: ProductOrderDTO = (
            await request(app.getHttpServer())
                .get('/api/product-orders/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create product-orders', async () => {
        const createdEntity: ProductOrderDTO = (
            await request(app.getHttpServer()).post('/api/product-orders').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update product-orders', async () => {
        const updatedEntity: ProductOrderDTO = (
            await request(app.getHttpServer()).put('/api/product-orders').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update product-orders from id', async () => {
        const updatedEntity: ProductOrderDTO = (
            await request(app.getHttpServer())
                .put('/api/product-orders/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE product-orders', async () => {
        const deletedEntity: ProductOrderDTO = (
            await request(app.getHttpServer())
                .delete('/api/product-orders/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
