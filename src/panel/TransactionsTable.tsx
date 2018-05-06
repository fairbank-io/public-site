import * as React from 'react';
import { Transaction } from 'state/data';
import * as moment from 'moment';

// Component properties
interface ComponentProps {
  txList: Transaction[];
}

// Component state
interface ComponentState {}

function formatAmount(val: Number, cur: string): string {
  return val.toLocaleString('en', {
    style: 'currency',
    currency: cur,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

class TransactionsTable extends React.Component<ComponentProps, ComponentState> {
  public render(): JSX.Element {
    let am: number = 0;
    this.props.txList.forEach(function(t: Transaction) {
      am += Number(t.amount);
    });
    let total: string = formatAmount(am / 100, 'USD');
    return (
      <div>
        <div className="alert alert-success">
          <h4>El saldo total de tu cuenta es de <span className="badge badge-secondary">{total} USD</span></h4>
        </div>
        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Monto</th>
            <th>Comisión</th>
            <th>Moneda</th>
            <th className="d-none d-md-table-cell">Fecha</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.txList.map(function (tx: Transaction, i: number) {
              return (
                <tr key={tx.time ? Date.parse(tx.time.toString()) : i}>
                  <td>{i + 1}</td>
                  <td>{formatAmount(Number(tx.amount / 100), tx.currency)}</td>
                  <td>{formatAmount(Number(tx.fees / 100), tx.currency)}</td>
                  <td>{tx.currency.toUpperCase()}</td>
                  <td className="d-none d-md-table-cell">{moment(tx.time).format('MMMM Do YYYY, h:mm a')}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionsTable;