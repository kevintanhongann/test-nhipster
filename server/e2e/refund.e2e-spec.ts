import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { RefundDTO } from '../src/service/dto/refund.dto';
import { RefundService } from '../src/service/refund.service';

describe('Refund Controller', () => {
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
            .overrideProvider(RefundService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all refunds ', async () => {
        const getEntities: RefundDTO[] = (await request(app.getHttpServer()).get('/api/refunds').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET refunds by id', async () => {
        const getEntity: RefundDTO = (
            await request(app.getHttpServer())
                .get('/api/refunds/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create refunds', async () => {
        const createdEntity: RefundDTO = (
            await request(app.getHttpServer()).post('/api/refunds').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update refunds', async () => {
        const updatedEntity: RefundDTO = (
            await request(app.getHttpServer()).put('/api/refunds').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update refunds from id', async () => {
        const updatedEntity: RefundDTO = (
            await request(app.getHttpServer())
                .put('/api/refunds/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE refunds', async () => {
        const deletedEntity: RefundDTO = (
            await request(app.getHttpServer())
                .delete('/api/refunds/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
