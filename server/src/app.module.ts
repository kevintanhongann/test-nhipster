import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BuyerModule } from './module/buyer.module';
import { ProductModule } from './module/product.module';
import { ProductImageModule } from './module/product-image.module';
import { ProductTagModule } from './module/product-tag.module';
import { ProductCategoryModule } from './module/product-category.module';
import { ProductAttributeModule } from './module/product-attribute.module';
import { ProductAttributeTermModule } from './module/product-attribute-term.module';
import { ProductReviewModule } from './module/product-review.module';
import { ProductVariationModule } from './module/product-variation.module';
import { ProductShippingClassModule } from './module/product-shipping-class.module';
import { CouponModule } from './module/coupon.module';
import { ItemModule } from './module/item.module';
import { ProductOrderModule } from './module/product-order.module';
import { AddressModule } from './module/address.module';
import { NotificationModule } from './module/notification.module';
import { InvoiceModule } from './module/invoice.module';
import { TransactionModule } from './module/transaction.module';
import { TaxRateModule } from './module/tax-rate.module';
import { TaxClassModule } from './module/tax-class.module';
import { RefundModule } from './module/refund.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        ServeStaticModule.forRoot({
            rootPath: config.getClientPath(),
        }),
        AuthModule,
        BuyerModule,
        ProductModule,
        ProductImageModule,
        ProductTagModule,
        ProductCategoryModule,
        ProductAttributeModule,
        ProductAttributeTermModule,
        ProductReviewModule,
        ProductVariationModule,
        ProductShippingClassModule,
        CouponModule,
        ItemModule,
        ProductOrderModule,
        AddressModule,
        NotificationModule,
        InvoiceModule,
        TransactionModule,
        TaxRateModule,
        TaxClassModule,
        RefundModule,
        // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}
