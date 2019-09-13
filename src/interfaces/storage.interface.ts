// storage.interface.ts

import {Container, File} from '../models';

export type Callback<T> = (err: Error | null, reply: T) => void;

export interface IGooogleStorageService {
  // container methods
  createContainer(container: Partial<Container>, cb: Callback<Container>): void;
  destroyContainer(containerName: string, cb: Callback<boolean>): void;
  getContainers(cb: Callback<Container[]>): void;
  getContainer(containerName: string, cb: Callback<Container>): void;
  // file methods
  getFiles(containerName: string, options: Object, cb: Callback<File[]>): void;
  getFile(containerName: string, fileName: string, cb: Callback<File>): void;
  removeFile(
    containerName: string,
    fileName: string,
    cb: Callback<boolean>,
  ): void;
  // main methods
  upload(
    containerName: string,
    req: any,
    res: any,
    options: Object,
    cb: Callback<any>,
  ): void;
  download(
    containerName: string,
    fileName: string,
    req: any,
    res: any,
    cb: Callback<any>,
  ): void;
}
