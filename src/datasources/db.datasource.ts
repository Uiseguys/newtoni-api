// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './db.datasource.json';

export class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';

  constructor(
    @inject('datasources.config.db', { optional: true })
    dsConfig: object = {
      "name": process.env.DATABASE_NAME || "deokbd5st1l65q",
      "connector": "postgresql",
      "url":process.env.DATABASE_URL || "postgres://auncatpokxioin:3fb3ddcef6bc0f841e523caed5c0db765942003f4d266fba02446754cec0b273@ec2-54-163-234-88.compute-1.amazonaws.com:5432/deokbd5st1l65q",
      "ssl": true
    },
  ) {
    super(dsConfig);
  }
}
