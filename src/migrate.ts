import { DataSource, Repository } from '@loopback/repository';
import { WeingutApi } from './index';
import {
  UserRepository, SettingRepository, ProductRepository, RoleMappingRepository, RolesRepository,
  AclRepository, LogsRepository, ResourceRepository, OrderRepository, NewsletterRepository

} from './repositories';

export async function dsMigrate(app: WeingutApi) {
  const ds = await app.get<DataSource>('datasources.db');
  const userRepo = await app.getRepository(UserRepository);
  const settRepo = await app.getRepository(SettingRepository);
  const productRepo = await app.getRepository(ProductRepository);
  const rolemapRepo = await app.getRepository(RoleMappingRepository);
  const rolesRepo = await app.getRepository(RolesRepository);
  const aclRepo = await app.getRepository(AclRepository);
  const logRepo = await app.getRepository(LogsRepository);
  const resourceRepo = await app.getRepository(ResourceRepository);
  const orderRepo = await app.getRepository(OrderRepository);
  const newsRepo = await app.getRepository(NewsletterRepository);
  await ds.automigrate();
}

export async function dsUpdate(app: WeingutApi) {
  const ds = await app.get<DataSource>('datasources.db');
  const userRepo = await app.getRepository(UserRepository);
  const settRepo = await app.getRepository(SettingRepository);
  const productRepo = await app.getRepository(ProductRepository);
  const rolemapRepo = await app.getRepository(RoleMappingRepository);
  const rolesRepo = await app.getRepository(RolesRepository);
  const aclRepo = await app.getRepository(AclRepository);
  const logRepo = await app.getRepository(LogsRepository);
  const resourceRepo = await app.getRepository(ResourceRepository);
  const orderRepo = await app.getRepository(OrderRepository);
  const newsRepo = await app.getRepository(NewsletterRepository);

  await ds.autoupdate();
}


/*
export * from './user.repository';
export * from './setting.repository';
export * from './wine.repository';
export * from './package.repository';
export * from './roles.repository';
export * from './acl.repository';
export * from './logs.repository';
export * from './role-mapping.repository';
export * from './template.repository';
export * from './resource.repository';
export * from './order.repository';





*/
