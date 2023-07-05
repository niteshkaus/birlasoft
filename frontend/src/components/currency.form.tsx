import * as React from 'react';
import Currency from '../models/currency';
import { CurrencyForm } from './currencyForm';

interface IProps {
    currency: Currency;
    onChange: (fieldName: string, value: string) => void;
    onSave: () => void;
}

export const CurrencyPage: React.FunctionComponent<IProps> = (props: IProps) => {  
    return (
        <CurrencyForm
        currency={props.currency}
            onChange={props.onChange}
            onSave={props.onSave}
        />
        
    );
}
