import * as React from "react";
import DataTable from 'react-data-table-component';
//import TableRow from "./TableRow";
import Currency from "../models/currency";
import BaseService from "../service/base.service";
import * as toastr from "toastr";

interface IProps { currencyListUpdated: boolean}
interface IState {
  listCurrency: Array<Currency>;
  isReady: Boolean;
  hasError: Boolean;
  filterText?: string;
}

class Index extends React.Component<IProps, IState> {
  public state: IState = {
    listCurrency: new Array<Currency>(),
    isReady: false,
    hasError: false,
    filterText: "",
  };
  public columns: any = [];
  constructor(props: IProps) {
    super(props);
    this.state = {
      isReady: false,
      listCurrency: Array<Currency>(),
      hasError: false,
      filterText: ""
    };
    this.columns = [
      {
        name: 'Currency Name',
        selector: 'FullName',
        sortable: true,
      },
      {
        name: 'Symbol',
        selector: 'Symbol',
        sortable: true,
      },
      {
        name: 'Price',
        selector: 'Price',
        sortable: true,
      },
      {
        name: 'Volume',
        selector: 'Volume',
      },
    ];
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
      if(this.props.currencyListUpdated !== prevProps.currencyListUpdated){
        this.fetchData();
      }
  }

  public componentDidMount() {
    this.fetchData();
  }

  public fetchData = (value: any = '') => {
    let queryparams = (value !== '' ? '/?search='+value : '')
    BaseService.getAll<Currency>("/currency"+queryparams).then((rp) => {
      if (rp.Status) {
        const data = rp.Data;
        const listCurrency = new Array<Currency>();

        (data || []).forEach((p: any) => {
          listCurrency.push(new Currency(p._id, p.full_name, p.symbol, p.price, p.volume));
        });

        this.setState({ listCurrency: listCurrency }); 
        this.setState({ isReady: true });
      } else {
        this.setState({ isReady: true });
        this.setState({ hasError: true });
        console.log("Messages: " + rp.Messages);
        console.log("Exception: " + rp.Exception);
      }
    });

    setTimeout(() => {
      if (!this.state.isReady) {
        toastr.info(
          "It is possible that the service is being restarted, please wait more ...",
          "",
          { timeOut: 8000 }
        );
      }

      if (this.state.hasError) {
        toastr.error(
          "An error occurred!",
          "",
          { timeOut: 8000 }
        );
      }
    }, 2000);
  }

  public tabRow = () => {
    if (!this.state.isReady) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      );
    }
    if (this.state.hasError) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <div className="alert alert-danger" role="alert">
              An error occurred!
            </div>
          </td>
        </tr>
      );
    }    
  };

  public render(): React.ReactNode {
    return (
      <div>
        <div className="search">
        <span className="">Search: </span>
        <input
          className="inputlabel"
          type="text"
          defaultValue={this.state.filterText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.fetchData(e.target.value)}

        />
      </div>

        <DataTable
        title="Currency List"
        columns={this.columns}
        data={this.state.listCurrency}
        pagination
        highlightOnHover
        responsive={true}
      />
      </div>
    );
  }
}
export default Index;
