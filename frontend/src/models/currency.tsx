export default class Currency {
    Id?: string;
    FullName: string;
    Symbol: string;
    Price: number;
    Volume: number;

    constructor(id: string,fullanme: string, symbol: string, price: number, volume: number) {
        this.Id = id;
        this.FullName = fullanme;
        this.Symbol = symbol;
        this.Price = price;
        this.Volume = volume;
    } 
}