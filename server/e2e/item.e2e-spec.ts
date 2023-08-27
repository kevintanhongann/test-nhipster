import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ItemDTO } from '../src/service/dto/item.dto';
import { ItemService } from '../src/service/item.service';

describe('Item Controller', () => {
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
            .overrideProvider(ItemService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all items ', async () => {
        const getEntities: ItemDTO[] = (await request(app.getHttpServer()).get('/api/items').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET items by id', async () => {
        const getEntity: ItemDTO = (
            await request(app.getHttpServer())
                .get('/api/items/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create items', async () => {
        const createdEntity: ItemDTO = (
            await request(app.getHttpServer()).post('/api/items').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update items', async () => {
        const updatedEntity: ItemDTO = (
            await request(app.getHttpServer()).put('/api/items').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update items from id', async () => {
        const updatedEntity: ItemDTO = (
            await request(app.getHttpServer())
                .put('/api/items/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE items', async () => {
        const deletedEntity: ItemDTO = (
            await request(app.getHttpServer())
                .delete('/api/items/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
