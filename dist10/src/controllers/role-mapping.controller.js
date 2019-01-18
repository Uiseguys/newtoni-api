"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let RoleMappingController = class RoleMappingController {
    constructor(roleMappingRepository) {
        this.roleMappingRepository = roleMappingRepository;
    }
    async create(roleMapping) {
        return await this.roleMappingRepository.create(roleMapping);
    }
    async count(where) {
        return await this.roleMappingRepository.count(where);
    }
    async find(filter) {
        return await this.roleMappingRepository.find(filter);
    }
    async updateAll(roleMapping, where) {
        return await this.roleMappingRepository.updateAll(roleMapping, where);
    }
    async findById(id) {
        return await this.roleMappingRepository.findById(id);
    }
    async updateById(id, roleMapping) {
        await this.roleMappingRepository.updateById(id, roleMapping);
    }
    async deleteById(id) {
        await this.roleMappingRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/role-mappings', {
        responses: {
            '200': {
                description: 'RoleMapping model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.RoleMapping } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.RoleMapping]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "create", null);
__decorate([
    rest_1.get('/role-mappings/count', {
        responses: {
            '200': {
                description: 'RoleMapping model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.RoleMapping))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "count", null);
__decorate([
    rest_1.get('/role-mappings', {
        responses: {
            '200': {
                description: 'Array of RoleMapping model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.RoleMapping } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.RoleMapping))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "find", null);
__decorate([
    rest_1.patch('/role-mappings', {
        responses: {
            '200': {
                description: 'RoleMapping PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.RoleMapping))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.RoleMapping, Object]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/role-mappings/{id}', {
        responses: {
            '200': {
                description: 'RoleMapping model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.RoleMapping } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "findById", null);
__decorate([
    rest_1.patch('/role-mappings/{id}', {
        responses: {
            '204': {
                description: 'RoleMapping PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.RoleMapping]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "updateById", null);
__decorate([
    rest_1.del('/role-mappings/{id}', {
        responses: {
            '204': {
                description: 'RoleMapping DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleMappingController.prototype, "deleteById", null);
RoleMappingController = __decorate([
    __param(0, repository_1.repository(repositories_1.RoleMappingRepository)),
    __metadata("design:paramtypes", [repositories_1.RoleMappingRepository])
], RoleMappingController);
exports.RoleMappingController = RoleMappingController;
//# sourceMappingURL=role-mapping.controller.js.map