import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProductShippingClassDTO } from '../src/service/dto/product-shipping-class.dto';
import { ProductShippingClassService } from '../src/service/product-shipping-class.service';

describe('ProductShippingClass Controller', () => {
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
            .overrideProvider(ProductShippingClassService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all product-shipping-classes ', async () => {
        const getEntities: ProductShippingClassDTO[] = (
            await request(app.getHttpServer()).get('/api/product-shipping-classes').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET product-shipping-classes by id', async () => {
        const getEntity: ProductShippingClassDTO = (
            await request(app.getHttpServer())
                .get('/api/product-shipping-classes/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create product-shipping-classes', async () => {
        const createdEntity: ProductShippingClassDTO = (
            await request(app.getHttpServer()).post('/api/product-shipping-classes').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update product-shipping-classes', async () => {
        const updatedEntity: ProductShippingClassDTO = (
            await request(app.getHttpServer()).put('/api/product-shipping-classes').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update product-shipping-classes from id', async () => {
        const updatedEntity: ProductShippingClassDTO = (
            await request(app.getHttpServer())
                .put('/api/product-shipping-classes/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE product-shipping-classes', async () => {
        const deletedEntity: ProductShippingClassDTO = (
            await request(app.getHttpServer())
                .delete('/api/product-shipping-classes/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
