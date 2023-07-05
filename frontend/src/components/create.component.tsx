import React from 'react';
import * as toastr from 'toastr';
import Currency from '../models/currency';
import BaseService from '../service/base.service';
import { CurrencyPage } from './currency.form';
import Index from './index.component';


interface IProps {
    history: History;
    //Map properties match
    match: {
        isExact: boolean
        params: {
            id: string
        },
        path: string,
        url: string,
    }
}
interface IState {
    currency: Currency,
    currencyListUpdated: boolean
}


export default class Create extends React.Component<IProps, IState> {
    child: React.RefObject<any>;
    constructor(props: IProps) {
        super(props);
        this.child = React.createRef();
        this.state = {
            currency: {
                FullName: '',
                Symbol: '',
                Price: 0,
                Volume: 0,
            },
            currencyListUpdated: false
        }
        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            currency: {
                ...this.state.currency,
                [fieldName]: value,
            }
        };

        this.setState(nextState);
    }
    private onSave = () => {
        BaseService.create<Currency>("/currency", this.state.currency).then(
            (rp) => {
                if (rp.Status) {
                    toastr.success('Currency saved.');
                    this.setState({
                        currency: {
                            Id: '',
                            FullName: '',
                            Symbol: '',
                            Price: 0,
                            Volume: 0,
                        }
                    });
                    this.setState({currencyListUpdated: true});
                    //this.child.current.forceUpdate();
                } else {
                    toastr.error(rp.Messages);
                    console.log("Messages: " + rp.Messages);
                    console.log("Exception: " + rp.Exception);
                }
            }
        );

    }

    render() {
        return (
            <>
                <CurrencyPage
                    currency={this.state.currency}
                    onChange={this.onFieldValueChange}
                    onSave={this.onSave}
                />
                <Index currencyListUpdated={this.state.currencyListUpdated} />
            </>
        );
    }

}