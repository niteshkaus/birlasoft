import React from "react";
import Currency from "../models/currency";

interface IProps {
  currency: Currency;
  index: Number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => { 
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.currency.FullName}</td>
      <td>{props.currency.Symbol}</td>
      <td>{props.currency.Price}</td>
      <td>{props.currency.Volume}</td>
      
    </tr>
  );
};
export default TableRow;
