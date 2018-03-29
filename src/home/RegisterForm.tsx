import * as React from 'react';
import * as jQuery from 'jquery';
import * as API from 'state/api';
import { Referral } from 'state/data';
import * as CryptoJS from 'crypto-js';

// UI
import Alert from 'components/Alert';

// Component properties
interface ComponentProps {}

// Component state
interface ComponentState {
  alert: string;
  alertLevel: string;
}

class RegisterForm extends React.Component<ComponentProps, ComponentState> {
  form: HTMLFormElement | null;

  client: API.Client;

  commonErrors: object = {
    'EXISTING_ACCOUNT': 'La dirección de correo está asociada a otra cuenta'
  };

  constructor(props: ComponentProps) {
    super(props);
    this.client = new API.Client();
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      alert: '',
      alertLevel: 'warning'
    };
  }

  public render(): JSX.Element {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>Tras el proceso de registro recibirás un mensaje de correo electrónico con los detalles
              de activación de tu nueva cuenta.</p>
            <Alert type={this.state.alertLevel}>{this.state.alert}</Alert>
            <form className="needs-validation" noValidate={true} ref={(el) => this.form = el}>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="icon">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required={true}
                    className="form-control form-control-lg"
                  />
                  <div className="invalid-feedback">Debes proporcionar una dirección valida.</div>
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="icon">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="password"
                    name="password"
                    minLength={8}
                    required={true}
                    className="form-control form-control-lg"
                  />
                  <div className="invalid-feedback">El campo es obligatorio con un mínimo de 8 caracteres.</div>
                </div>
              </div>
              <div className="form-group">
                <label>Confirma tu Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="icon">
                        <i className="fas fa-check-circle" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="password"
                    name="confirmation"
                    minLength={8}
                    required={true}
                    className="form-control form-control-lg"
                  />
                  <div className="invalid-feedback">Debe coincidir con el password proporcionado.</div>
                </div>
              </div>
              <div className="form-buttons">
                <button className="btn btn-lg submit" onClick={this.handleRegister}>Crear Cuenta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private handleRegister(): void {
    if (!this.form) {
      return;
    }

    // Validate form
    if (!this.form.checkValidity()) {
      jQuery(this.form).addClass('was-validated');
      this.setState({
        alert: 'Los datos ingresados no son correctos',
        alertLevel: 'danger'
      });
      return;
    }

    // Validate password confirmation
    let email: string = jQuery(this.form).find('input[name="email"]').val() as string;
    let password: string = jQuery(this.form).find('input[name="password"]').val() as string;
    let confirmation: string = jQuery(this.form).find('input[name="confirmation"]').val() as string;
    if (password !== confirmation) {
      jQuery(this.form).find('input[name="confirmation"]').addClass('is-invalid');
      this.setState({
        alert: 'La confirmación de tu password no coincide',
        alertLevel: 'danger'
      });
      return;
    }
    jQuery(this.form).find('input[name="confirmation"]').removeClass('is-invalid');

    // Run API request
    let req: API.RequestAccountRegister = {
      email: email,
      password: CryptoJS.SHA256(password).toString(),
    };

    // Load referral information
    let urlParams: string = window.location.search.slice(1).split('#')[0];
    if (urlParams) {
      let referral: Referral = {} as Referral;
      urlParams.split('&').map(function (k: string) {
        if (k.split('=')[0] === 'invite') {
          referral.code = k.split('=')[1];
          req.referral = referral;
        }
      });
    }

    this.client.Register(req, (r, e) => {
      // Failed requests
      if (e) {
        this.setState({
          alert: 'Error Interno: ' + e,
          alertLevel: 'danger'
        });
        return;
      }

      // Bad results
      if (r && !r.ok) {
        this.setState({
          alert: this.commonErrors[r.desc] || r.desc,
          alertLevel: 'warning'
        });
        return;
      }

      // All good!
      this.setState({
        alert: 'Tu cuenta ha sido registrada exitosamente, en breve recibiras un correo con información de activación',
        alertLevel: 'success'
      });
    });
  }
}

export default RegisterForm;