import { ModificationNote } from "../common/model";

export interface ICurrency {
    _id?: String;
    full_name: String;
    symbol: String;
    price: Number;
    volume: Number;
    modification_notes: ModificationNote[]
}