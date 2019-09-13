import {inject} from '@loopback/core';
import {
  post,
  requestBody,
  del,
  param,
  get,
  getFilterSchemaFor,
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';
import {Filter} from '@loopback/repository';
import {promisify} from 'util';

import {IGooogleStorageService} from '../interfaces';
import {Container, File} from '../models';

export class GoogleStorageController {
  @inject('services.GoogleStorageService') // StorageGC is the name of the datasoruce
  private storageGcSvc: IGooogleStorageService;

  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @inject(RestBindings.Http.RESPONSE) public response: Response,
  ) {}

  @post('/containers', {
    responses: {
      '200': {
        description: 'Container model instance',
        content: {'application/json': {schema: {'x-ts-type': Container}}},
      },
    },
  })
  async createContainer(
    @requestBody() container: Container,
  ): Promise<Container> {
    const createContainer = promisify(this.storageGcSvc.createContainer);
    return await createContainer(container);
  }

  @get('/containers', {
    responses: {
      '200': {
        description: 'Array of Containers model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Container}},
          },
        },
      },
    },
  })
  async findContainer(
    @param.query.object('filter', getFilterSchemaFor(Container))
    filter?: Filter,
  ): Promise<Container[]> {
    const getContainers = promisify(this.storageGcSvc.getContainers);
    return await getContainers();
  }

  @get('/containers/{containerName}', {
    responses: {
      '200': {
        description: 'Container model instance',
        content: {'application/json': {schema: {'x-ts-type': Container}}},
      },
    },
  })
  async findContainerByName(
    @param.path.string('containerName') containerName: string,
  ): Promise<Container> {
    const getContainer = promisify(this.storageGcSvc.getContainer);
    return await getContainer(containerName);
  }

  @del('/containers/{containerName}', {
    responses: {
      '204': {
        description: 'Container DELETE success',
      },
    },
  })
  async deleteContainerByName(
    @param.path.string('containerName') containerName: string,
  ): Promise<boolean> {
    const destroyContainer = promisify(this.storageGcSvc.destroyContainer);
    return await destroyContainer(containerName);
  }

  @get('/containers/{containerName}/files', {
    responses: {
      '200': {
        description: 'Array of Files model instances belongs to container',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': File}},
          },
        },
      },
    },
  })
  async findFilesInContainer(
    @param.path.string('containerName') containerName: string,
    @param.query.object('filter', getFilterSchemaFor(Container))
    filter?: Filter,
  ): Promise<File[]> {
    const getFiles = promisify(this.storageGcSvc.getFiles);
    return await getFiles(containerName, {});
  }

  @get('/containers/{containerName}/files/{fileName}', {
    responses: {
      '200': {
        description: 'File model instances belongs to container',
        content: {'application/json': {schema: {'x-ts-type': File}}},
      },
    },
  })
  async findFileInContainer(
    @param.path.string('containerName') containerName: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<File> {
    const getFile = promisify(this.storageGcSvc.getFile);
    return await getFile(containerName, fileName);
  }

  @del('/containers/{containerName}/files/{fileName}', {
    responses: {
      '204': {
        description: 'File DELETE from Container success',
      },
    },
  })
  async deleteFileInContainer(
    @param.path.string('containerName') containerName: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<boolean> {
    const removeFile = promisify(this.storageGcSvc.removeFile);
    return await removeFile(containerName, fileName);
  }

  @post('/containers/{containerName}/upload', {
    responses: {
      '200': {
        description: 'Upload a Files model instances into Container',
        content: {'application/json': {schema: {'x-ts-type': File}}},
      },
    },
  })
  async upload(
    @param.path.string('containerName') containerName: string,
  ): Promise<File> {
    const upload = promisify(this.storageGcSvc.upload);
    return await upload(containerName, this.request, this.response, {});
  }

  @get('/containers/{containerName}/download/{fileName}', {
    responses: {
      '200': {
        description: 'Download a File within specified Container',
        content: {'application/json': {schema: {'x-ts-type': Object}}},
      },
    },
  })
  async download(
    @param.path.string('containerName') containerName: string,
    @param.path.string('fileName') fileName: string,
  ): Promise<any> {
    const download = promisify(this.storageGcSvc.download);
    return await download(containerName, fileName, this.request, this.response);
  }
}
