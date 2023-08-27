import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProductImageDTO } from '../src/service/dto/product-image.dto';
import { ProductImageService } from '../src/service/product-image.service';

describe('ProductImage Controller', () => {
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
            .overrideProvider(ProductImageService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all product-images ', async () => {
        const getEntities: ProductImageDTO[] = (
            await request(app.getHttpServer()).get('/api/product-images').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET product-images by id', async () => {
        const getEntity: ProductImageDTO = (
            await request(app.getHttpServer())
                .get('/api/product-images/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create product-images', async () => {
        const createdEntity: ProductImageDTO = (
            await request(app.getHttpServer()).post('/api/product-images').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update product-images', async () => {
        const updatedEntity: ProductImageDTO = (
            await request(app.getHttpServer()).put('/api/product-images').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update product-images from id', async () => {
        const updatedEntity: ProductImageDTO = (
            await request(app.getHttpServer())
                .put('/api/product-images/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE product-images', async () => {
        const deletedEntity: ProductImageDTO = (
            await request(app.getHttpServer())
                .delete('/api/product-images/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
