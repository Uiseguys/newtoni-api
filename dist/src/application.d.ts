import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
declare const WeingutApi_base: (new (...args: any[]) => {
    [x: string]: any;
    projectRoot: string;
    bootOptions?: import("@loopback/boot").BootOptions | undefined;
    boot(): Promise<void>;
    booters(...booterCls: import("@loopback/core").Constructor<import("@loopback/boot").Booter>[]): import("@loopback/boot").Binding<any>[];
    component(component: import("@loopback/core").Constructor<{}>): void;
    mountComponentBooters(component: import("@loopback/core").Constructor<{}>): void;
}) & (new (...args: any[]) => {
    [x: string]: any;
    serviceProvider<S>(provider: import("@loopback/service-proxy").Class<import("@loopback/core").Provider<S>>): void;
    component(component: import("@loopback/service-proxy").Class<{}>): void;
    mountComponentServices(component: import("@loopback/service-proxy").Class<{}>): void;
}) & (new (...args: any[]) => {
    [x: string]: any;
    repository(repo: import("@loopback/repository").Class<import("@loopback/repository").Repository<any>>): void;
    getRepository<R extends import("@loopback/repository").Repository<any>>(repo: import("@loopback/repository").Class<R>): Promise<R>;
    dataSource(dataSource: import("loopback-datasource-juggler").DataSource | import("@loopback/repository").Class<import("loopback-datasource-juggler").DataSource>, name?: string | undefined): void;
    component(component: import("@loopback/repository").Class<{}>): void;
    mountComponentRepositories(component: import("@loopback/repository").Class<{}>): void;
    migrateSchema(options?: import("@loopback/repository").SchemaMigrationOptions | undefined): Promise<void>;
}) & typeof RestApplication;
export declare class WeingutApi extends WeingutApi_base {
    constructor(options?: ApplicationConfig);
}
export {};
