import * as React from 'react';
import Currency from '../models/currency';

import { Input, Button } from '../common/components/form';

interface Props {
    currency: Currency;
    onChange: (fieldName: string, value: string) => void;
    onSave: () => void;
}

export const CurrencyForm: React.FunctionComponent<Props> = (props) => { 
    return (
        <form>
            <h1>Manage crypto currency</h1>

            <Input
                name="FullName"
                label="FullName"
                value={props.currency.FullName}
                onChange={props.onChange}
            />

            <Input
                name="Symbol"
                label="Symbol"
                value={props.currency.Symbol}
                onChange={props.onChange}
            />

            <Input
                name="Price"
                label="Price"
                value={props.currency.Price.toString()}
                onChange={props.onChange}
            />

            <Input
                name="Volume"
                label="Volume"
                value={props.currency.Volume.toString()}
                onChange={props.onChange}
            />

            <Button
                label="Save"
                className="btn btn-success mt-2"
                onClick={props.onSave}
            />
        </form>
    );
};
