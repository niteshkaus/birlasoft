import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ICurrency } from '../modules/currency/model';
import CurrencyService from '../modules/currency/service';
import e = require('express');

export class CurrencyController {

    private currency_service: CurrencyService = new CurrencyService();

    public create_currency(req: Request, res: Response) {
        if (req.body.FullName && req.body.Symbol &&
            req.body.Price &&
            req.body.Volume) {
            const currency_params: ICurrency = {
                full_name: req.body.FullName,
                symbol: req.body.Symbol,
                price: req.body.Price,
                volume: req.body.Volume,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New currency data created'
                }]
            };
            this.currency_service.createCurrency(currency_params, (err: any, currency_data: ICurrency) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create currency data successfull', currency_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public getAll(req: Request, res: Response) {
        this.currency_service.getAll({}, (err: any, currency_data: ICurrency) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('get currency data successfull', currency_data, res);
            }
        });

    }

    public get_currency(req: Request, res: Response) {
        if (req.params.id) {
            const currency_filter = { _id: req.params.id };
            this.currency_service.filterCurrency(currency_filter, (err: any, currency_data: ICurrency) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get currency data by id successfull', currency_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}