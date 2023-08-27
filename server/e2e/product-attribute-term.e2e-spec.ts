import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProductAttributeTermDTO } from '../src/service/dto/product-attribute-term.dto';
import { ProductAttributeTermService } from '../src/service/product-attribute-term.service';

describe('ProductAttributeTerm Controller', () => {
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
            .overrideProvider(ProductAttributeTermService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all product-attribute-terms ', async () => {
        const getEntities: ProductAttributeTermDTO[] = (
            await request(app.getHttpServer()).get('/api/product-attribute-terms').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET product-attribute-terms by id', async () => {
        const getEntity: ProductAttributeTermDTO = (
            await request(app.getHttpServer())
                .get('/api/product-attribute-terms/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create product-attribute-terms', async () => {
        const createdEntity: ProductAttributeTermDTO = (
            await request(app.getHttpServer()).post('/api/product-attribute-terms').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update product-attribute-terms', async () => {
        const updatedEntity: ProductAttributeTermDTO = (
            await request(app.getHttpServer()).put('/api/product-attribute-terms').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update product-attribute-terms from id', async () => {
        const updatedEntity: ProductAttributeTermDTO = (
            await request(app.getHttpServer())
                .put('/api/product-attribute-terms/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE product-attribute-terms', async () => {
        const deletedEntity: ProductAttributeTermDTO = (
            await request(app.getHttpServer())
                .delete('/api/product-attribute-terms/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
