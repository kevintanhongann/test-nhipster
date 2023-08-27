import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CouponDTO } from '../src/service/dto/coupon.dto';
import { CouponService } from '../src/service/coupon.service';

describe('Coupon Controller', () => {
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
            .overrideProvider(CouponService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all coupons ', async () => {
        const getEntities: CouponDTO[] = (await request(app.getHttpServer()).get('/api/coupons').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET coupons by id', async () => {
        const getEntity: CouponDTO = (
            await request(app.getHttpServer())
                .get('/api/coupons/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create coupons', async () => {
        const createdEntity: CouponDTO = (
            await request(app.getHttpServer()).post('/api/coupons').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update coupons', async () => {
        const updatedEntity: CouponDTO = (
            await request(app.getHttpServer()).put('/api/coupons').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update coupons from id', async () => {
        const updatedEntity: CouponDTO = (
            await request(app.getHttpServer())
                .put('/api/coupons/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE coupons', async () => {
        const deletedEntity: CouponDTO = (
            await request(app.getHttpServer())
                .delete('/api/coupons/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
