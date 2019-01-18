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
var request = require('request');
const config = require("../datasources/db.datasource.json");
let NewsletterController = class NewsletterController {
    constructor(newsletterRepository) {
        this.newsletterRepository = newsletterRepository;
    }
    async create(newsletter) {
        var subscriber = JSON.stringify({
            "email_address": newsletter.email,
            "status": "subscribed"
        });
        request({
            method: 'POST',
            url: 'https://us20.api.mailchimp.com/3.0/lists/' + config.mailchimp.listId + '/members',
            body: subscriber,
            headers: {
                Authorization: 'apikey ' + config.mailchimp.apiKey,
                'Content-Type': 'application/json'
            }
        }, function (error, response, body) {
            if (error) {
                return error;
            }
            else {
                var bodyObj = JSON.parse(body);
                if (bodyObj.status === 400) {
                    return bodyObj.detail;
                }
                var bodyObj = JSON.parse(body);
                return bodyObj;
            }
        });
        return await this.newsletterRepository.create(newsletter);
    }
};
__decorate([
    rest_1.post('/newsletters', {
        responses: {
            '200': {
                description: 'Newsletter model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Newsletter } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Newsletter]),
    __metadata("design:returntype", Promise)
], NewsletterController.prototype, "create", null);
NewsletterController = __decorate([
    __param(0, repository_1.repository(repositories_1.NewsletterRepository)),
    __metadata("design:paramtypes", [repositories_1.NewsletterRepository])
], NewsletterController);
exports.NewsletterController = NewsletterController;
//# sourceMappingURL=newsletter.controller.js.map