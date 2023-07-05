import { ICurrency } from './model';
import currencys from './schema';

export default class CurrencyService {
    
    public createCurrency(currency_params: ICurrency, callback: any) {
        const _session = new currencys(currency_params);
        _session.save(callback);
    }

    public getAll(req: any, callback: any) {
        if(req.query.search){
            currencys.find({full_name: { $regex: '.*' + req.query.search + '.*' } }, callback);
        } else {
            currencys.find({}, callback);
        }
    }

    public filterCurrency(query: any, callback: any) {
        currencys.findOne(query, callback);
    }
}