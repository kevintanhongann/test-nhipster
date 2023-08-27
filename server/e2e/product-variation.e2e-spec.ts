import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProductVariationDTO } from '../src/service/dto/product-variation.dto';
import { ProductVariationService } from '../src/service/product-variation.service';

describe('ProductVariation Controller', () => {
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
            .overrideProvider(ProductVariationService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all product-variations ', async () => {
        const getEntities: ProductVariationDTO[] = (
            await request(app.getHttpServer()).get('/api/product-variations').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET product-variations by id', async () => {
        const getEntity: ProductVariationDTO = (
            await request(app.getHttpServer())
                .get('/api/product-variations/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create product-variations', async () => {
        const createdEntity: ProductVariationDTO = (
            await request(app.getHttpServer()).post('/api/product-variations').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update product-variations', async () => {
        const updatedEntity: ProductVariationDTO = (
            await request(app.getHttpServer()).put('/api/product-variations').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update product-variations from id', async () => {
        const updatedEntity: ProductVariationDTO = (
            await request(app.getHttpServer())
                .put('/api/product-variations/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE product-variations', async () => {
        const deletedEntity: ProductVariationDTO = (
            await request(app.getHttpServer())
                .delete('/api/product-variations/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
