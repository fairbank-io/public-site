import * as React from 'react';
import * as jQuery from 'jquery';
import * as utils from 'utils';
import { Card, CardToken, Transaction } from 'state/data';

// UI
import Alert from 'components/Alert';

// Account publishable keys
const STRIPE_KEY_TEST: string = 'pk_test_gyZ8Q0eqgHCfUiO5Q98oq6GF';
const STRIPE_KEY_LIVE: string = 'pk_live_MDaBbPDPvVmphZ5Dg5GtFFvt';

// Component properties
interface ComponentProps {
  onSubmit: (req: Transaction) => void;
  addFees: boolean;
}

// Component state
interface ComponentState {
  alert: string;
  alertLevel: string;
  stripe: stripe.Stripe | null;
  working: boolean;
}

interface FormData {
  method: string;
  description: string;
  amount: number;
  currency: string;
  card: Card;
}

class TransactionForm extends React.Component<ComponentProps, ComponentState> {
  form: HTMLFormElement | null;
  amount: HTMLInputElement | null;
  cardDetails: stripe.elements.Element;
  isCardValid: boolean;

  constructor(props: ComponentProps) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
    this.validateAmount = this.validateAmount.bind(this);
    this.state = {
      alert: '',
      alertLevel: 'warning',
      stripe: null,
      working: false
    };
  }

  componentDidMount() {
    this.setState({
      stripe: Stripe((process.env.NODE_ENV === 'production') ? STRIPE_KEY_LIVE : STRIPE_KEY_TEST)
    });
  }

  componentDidUpdate() {
    if (this.state.stripe && !this.cardDetails) {
      this.cardDetails = this.state.stripe.elements({locale: 'auto'}).create('card', {
        hidePostalCode: true,
        iconStyle: 'solid',
        style: {
          base: {
            fontSize: '18px'
          }
        }
      });
      this.cardDetails.on('change', (e: stripe.elements.ElementChangeResponse) => {
        this.isCardValid = e.complete;
      });
      this.cardDetails.mount('#stripe-card-element');
    }
  }

  componentWillUnmount() {
    this.cardDetails.destroy();
  }

  public render(): JSX.Element {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>
              Utiliza el siguiente formulario para agregar fondos a tu cuenta utilizando una tarjeta de
              crédito o débito.
            </p>
            <Alert type={this.state.alertLevel}>{this.state.alert}</Alert>
            <form className="needs-validation" noValidate={true} ref={(el) => this.form = el}>
              <input type="hidden" name="currency" value="usd" />
              <input type="hidden" name="method" value="stripe" />
              <input type="hidden" name="description" value="WEBSITE_FUNDS_ADDITION" />
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Monto</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span>USD</span>
                      </div>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      required={true}
                      placeholder="5.00"
                      onChange={this.validateAmount}
                      min={5.00}
                      max={1000.00}
                      step={0.01}
                      ref={(el) => this.amount = el}
                      className="form-control"
                    />
                    <div className="invalid-feedback">
                      El campo es obligatorio, con un valor mínimo de 5.00 y un máximo de 2 decimales.
                    </div>
                  </div>
                </div>
                <small id="amountDescription" className="form-text text-muted" />
              </div>
              <hr className="mb-4" />
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Nombre del Titular</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <span className="icon">
                          <i className="fas fa-user-circle" />
                        </span>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="card[name]"
                      required={true}
                      className="form-control"
                    />
                    <div className="invalid-feedback">El campo es obligatorio.</div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Código Postal</label>
                  <input
                    type="text"
                    name="card[address][postal_code]"
                    required={true}
                    className="form-control"
                  />
                  <div className="invalid-feedback">El campo es obligatorio.</div>
                </div>
                <div className="form-group col-md-6">
                  <label>País</label>
                  <input
                    type="text"
                    name="card[address][country_code]"
                    required={true}
                    value="MX"
                    readOnly={true}
                    className="form-control"
                  />
                  <div className="invalid-feedback">El campo es obligatorio.</div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="stripe-card-element">Datos de la Tarjeta</label>
                  <div id="stripe-card-element" />
                </div>
              </div>
              <hr className="mb-4" />
              <div className="form-buttons">
                <button className="btn btn-lg submit" onClick={this.handleForm} disabled={this.state.working}>
                  Procesar Transacción
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private validateAmount(): void {
    if (!this.amount) {
      return;
    }

    let desc = jQuery('#amountDescription');
    let fees: string = '3.5% + 0.50 USD';
    let v: number = Number(jQuery(this.amount).val());
    if (this.props.addFees) {
      v += (v * .035) + 0.5;
      desc.html('Trás agregar costos de procesamiento por <strong>' + fees +
        '</strong>, el monto total de la transacción será de <strong>' + v.toFixed(2) + '</strong>');
    } else {
      v -= (v * .035) - 0.5;
      desc.html('Trás costos de procesamiento de <strong>' + fees +
        '</strong>, el saldo efectivo a tu cuenta será de <strong>' + v.toFixed(2) + '</strong>');
    }
  }

  private handleForm(): void {
    if (!this.form || !this.state.stripe) {
      return;
    }

    // Validate form
    if (!this.form.checkValidity()) {
      jQuery(this.form).addClass('was-validated');
      return;
    }

    // Validate card
    if (!this.isCardValid) {
      return;
    }

    this.setState({
      alert: 'Estamos procesando tu transacción...',
      working: true,
    });

    // Collect data and calculate amount / fees
    let fd: FormData = utils.serializeFormData(jQuery(this.form).serializeArray()) as FormData;
    let amount: number = Number(fd.amount);
    let fees: number = (amount * .035) + 0.5;
    amount = Math.round(Number(amount.toFixed(2)) * 100);
    fees = Math.round(Number(fees.toFixed(2)) * 100);

    // Generate card token
    this.state.stripe.createToken(this.cardDetails, {
      name: fd.card.name,
      address_country: fd.card.address.country_code,
      address_zip: fd.card.address.postal_code,
      currency: fd.currency
    }).then((res: stripe.TokenResponse) => {
      if (res.error || !res.token) {
        this.setState({
          alert: 'Ocurrio un error al validar tu tarjeta, verifica tus datos.',
          alertLevel: 'danger',
          working: false
        });
        return;
      }

      // Delegate tx
      this.props.onSubmit({
        amount: amount,
        fees: fees,
        currency: fd.currency,
        description: fd.description,
        method: fd.method,
        extensions: [{
          id: 'io.fairbank.stripe.cardtoken',
          version: '0.1.0',
          data: {
            code: (process.env.NODE_ENV === 'production') ? res.token.id : 'tok_mx',
            provider: 'stripe.com',
            card_brand: (res.token.card) ? res.token.card.brand : '',
            card_digits: (res.token.card) ? res.token.card.last4 : ''
          } as CardToken
        }]
      });
    });
  }
}

export default TransactionForm;
