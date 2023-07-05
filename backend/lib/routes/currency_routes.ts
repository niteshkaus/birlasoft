import { Application, Request, Response } from 'express';
import { CurrencyController } from '../controllers/currencyController';

export class CurrencyRoutes {
    private currency_controller: CurrencyController = new CurrencyController();
    public route(app: Application) {
        app.post('/api/currency', (req: Request, res: Response) => {
            this.currency_controller.create_currency(req, res);
        });

        app.get('/api/currency', (req: Request, res: Response) => {
            this.currency_controller.getAll(req, res);
        });
    }
}