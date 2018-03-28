import * as React from 'react';
import { Transaction } from 'state/data';

// Component properties
interface ComponentProps {
  transactionsList: Transaction[];
}

// Component state
interface ComponentState {}

class Transactions extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.newTransaction = this.newTransaction.bind(this);
  }

  public render(): JSX.Element {
    let contents: JSX.Element | null = null;
    if (this.props.transactionsList.length === 0) {
      contents = (
        <div className="emtpy-notice">
          <h2>Sin Transacciones Registradas</h2>
          <span className="icon">
            <i className="fas fa-credit-card" />
          </span>
        </div>
      );
    }

    return (
      <div>
        <h1>Balance y Transacciones</h1>
        <p>
          A continuación encontraras un listado de transacciones realizadas en tu cuenta. Recuerda agregar saldo inicial
          para poder realizar operaciones.
        </p>
        <button className="btn btn-lg submit" onClick={this.newTransaction}>Nueva Operación</button>
        {contents}
      </div>
    );
  }

  private newTransaction(): void {
    // handler
  }
}

export default Transactions;