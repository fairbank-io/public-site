import * as React from 'react';
import * as jQuery from 'jquery';
import * as utils from 'utils';
import * as API from 'state/api';

// Component properties
interface ComponentProps {
  onSubmit?: (req: API.RequestNewInvite) => void;
}

// Component state
interface ComponentState {}

class InviteForm extends React.Component<ComponentProps, ComponentState> {
  form: HTMLFormElement | null;

  constructor(props: ComponentProps) {
    super(props);
    this.handleForm = this.handleForm.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>Envia un mensaje personalizado a tus amigos para que se unan a la comunidad.</p>
            <form className="needs-validation" noValidate={true} ref={(el) => this.form = el}>
              <div className="form-group">
                <label>Nombre de tu amigo(a)</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="icon">
                        <i className="fas fa-user-secret" />
                      </span>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="name"
                    required={true}
                    minLength={8}
                    className="form-control form-control-lg"
                  />
                  <div className="invalid-feedback">Debes proporcionar su nombre completo.</div>
                </div>
              </div>
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
                <label>Mensaje Personalizado</label>
                <textarea
                  name="message"
                  rows={4}
                  required={true}
                  className="form-control"
                />
              </div>
              <div className="form-buttons">
                <button className="btn btn-lg submit" onClick={this.handleForm}>Enviar Invitación</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private handleForm(): void {
    if (!this.form) {
      return;
    }

    // Validate form
    if (!this.form.checkValidity()) {
      jQuery(this.form).addClass('was-validated');
      return;
    }

    // Deliver request
    if (this.props.onSubmit) {
      this.props.onSubmit(utils.serializeFormData(jQuery(this.form).serializeArray()) as API.RequestNewInvite);
    }
  }
}

export default InviteForm;
