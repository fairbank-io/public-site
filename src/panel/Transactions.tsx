import * as React from 'react';
import { Transaction } from 'state/data';

// UI
import SimpleModal from 'components/SimpleModal';
import TransactionForm from 'panel/TransactionForm';
import TransactionsTable from './TransactionsTable';

// Component properties
interface ComponentProps {
  transactionsList: Transaction[];
  onNewTx: (req: Transaction) => void;
}

// Component state
interface ComponentState {
  showModal: boolean;
}

class Transactions extends React.Component<ComponentProps, ComponentState> {
  modal: SimpleModal | null;

  constructor(props: ComponentProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      showModal: false
    };
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
    } else {
      contents = (
        <TransactionsTable txList={this.props.transactionsList} />
      );
    }

    // Modal
    let modal: JSX.Element | null = null;
    if (this.state.showModal) {
      modal = (
        <SimpleModal
          title={'Procesar Nueva Transacción'}
          onHide={() => this.setState({showModal: false})}
          ref={(el) => this.modal = el}
        >
          <TransactionForm
            addFees={true}
            onSubmit={(tx: Transaction) => {
              this.props.onNewTx(tx);
              this.closeModal();
            }}
          />
        </SimpleModal>
      );
    }

    return (
      <div>
        {modal}
        <h1>Balance y Transacciones</h1>
        <p>
          A continuación encontraras un listado de transacciones realizadas en tu cuenta. Recuerda agregar saldo inicial
          para poder realizar operaciones.
        </p>
        <button className="btn btn-lg submit"  onClick={() => this.setState({showModal: true})}>Nueva Operación</button>
        {contents}
      </div>
    );
  }

  private closeModal() {
    if (this.modal) {
      this.modal.close();
    }
  }
}

export default Transactions;