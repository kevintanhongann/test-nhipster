import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProductTagDTO } from '../src/service/dto/product-tag.dto';
import { ProductTagService } from '../src/service/product-tag.service';

describe('ProductTag Controller', () => {
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
            .overrideProvider(ProductTagService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all product-tags ', async () => {
        const getEntities: ProductTagDTO[] = (await request(app.getHttpServer()).get('/api/product-tags').expect(200))
            .body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET product-tags by id', async () => {
        const getEntity: ProductTagDTO = (
            await request(app.getHttpServer())
                .get('/api/product-tags/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create product-tags', async () => {
        const createdEntity: ProductTagDTO = (
            await request(app.getHttpServer()).post('/api/product-tags').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update product-tags', async () => {
        const updatedEntity: ProductTagDTO = (
            await request(app.getHttpServer()).put('/api/product-tags').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update product-tags from id', async () => {
        const updatedEntity: ProductTagDTO = (
            await request(app.getHttpServer())
                .put('/api/product-tags/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE product-tags', async () => {
        const deletedEntity: ProductTagDTO = (
            await request(app.getHttpServer())
                .delete('/api/product-tags/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
