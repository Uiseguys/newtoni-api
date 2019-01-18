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
const context_1 = require("@loopback/context");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
let ProductController = class ProductController {
    constructor(productRepository, user) {
        this.productRepository = productRepository;
        this.user = user;
    }
    async create(product, request, response) {
        product.id = Math.floor(1000 + Math.random() * 9000);
        return await this.productRepository.create(product);
    }
    async count(where) {
        return await this.productRepository.count(where);
    }
    async find(filter) {
        let self = this;
        let finaldata = [];
        return new Promise((resolve, reject) => {
            this.productRepository.find(filter, function (err, product) {
                resolve(product);
            });
        });
    }
    async updateAll(product, where) {
        return await this.productRepository.updateAll(product, where);
    }
    async findById(id) {
        return await this.productRepository.findById(id);
    }
    async updateById(id, product) {
        await this.productRepository.updateById(id, product);
    }
    async deleteById(id) {
        await this.productRepository.deleteById(id);
    }
};
__decorate([
    authentication_1.authenticate('BasicStrategy'),
    rest_1.post('/Products', {
        responses: {
            '200': {
                description: 'Product model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Product } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()), __param(1, context_1.inject(rest_1.RestBindings.Http.REQUEST)), __param(2, context_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Product, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    authentication_1.authenticate('BasicStrategy'),
    rest_1.get('/Products/count', {
        responses: {
            '200': {
                description: 'Product model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Product))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "count", null);
__decorate([
    rest_1.get('/Products', {
        responses: {
            '200': {
                description: 'Array of Product model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Product } },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Product))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "find", null);
__decorate([
    rest_1.patch('/Products', {
        responses: {
            '200': {
                description: 'Product PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Product))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Product, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/Products/{id}', {
        responses: {
            '200': {
                description: 'Product model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Product } } },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
__decorate([
    authentication_1.authenticate('BasicStrategy'),
    rest_1.patch('/Products/{id}', {
        responses: {
            '204': {
                description: 'Product PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Product]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateById", null);
__decorate([
    authentication_1.authenticate('BasicStrategy'),
    rest_1.del('/Products/{id}', {
        responses: {
            '204': {
                description: 'Product DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteById", null);
ProductController = __decorate([
    __param(0, repository_1.repository(repositories_1.ProductRepository)),
    __param(1, context_1.inject(authentication_1.AuthenticationBindings.CURRENT_USER, { optional: true })),
    __metadata("design:paramtypes", [repositories_1.ProductRepository, Object])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map