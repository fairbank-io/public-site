import * as React from 'react';
import * as jQuery from 'jquery';
import * as utils from 'utils';

import { AccountDetails, Address } from 'state/data';
import Accordion from 'components/Accordion';

// Component properties
interface ComponentProps {
  details: AccountDetails;
  onUpdateRequest: (details: AccountDetails) => void;
}

// Component state
interface ComponentState {}

class GeneralDetails extends React.Component<ComponentProps, ComponentState> {
  form: HTMLFormElement | null;

  constructor(props: ComponentProps) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  public render(): JSX.Element {
    let details: AccountDetails = this.props.details;
    if (!details.address) {
      details.address = {} as Address;
    }

    return (
      <div>
        <h1>Mi Cuenta</h1>
        <p>
          Es muy importante que mantengas completa y actualizada la información de tu cuenta para poder tener
          acceso a todas las funcionalidades de la plataforma.
        </p>
        <form ref={(el) => this.form = el}>
          <Accordion>
            <div className="card">
              <div className="card-header">
                <h5>Detalles Generales</h5>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Nombre(s)</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={details.name || ''}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Apellido(s)</label>
                    <input
                      type="text"
                      name="last_name"
                      defaultValue={details.last_name || ''}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h5>Domicilio</h5>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Calle y número</label>
                    <input
                      type="text"
                      name="address[street_address]"
                      placeholder="Con número interior en caso necesario"
                      defaultValue={details.address.street_address || ''}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Localidad</label>
                    <input
                      type="text"
                      name="address[locality]"
                      placeholder="Ciudad o Municipio"
                      defaultValue={details.address.locality || ''}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Región</label>
                    <input
                      type="text"
                      name="address[region]"
                      placeholder="Estado o Provincia"
                      defaultValue={details.address.region || ''}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Código Postal</label>
                    <input
                      type="text"
                      name="address[postal_code]"
                      defaultValue={details.address.postal_code || ''}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>País</label>
                    <input
                      type="text"
                      name="address[country_code]"
                      value="MX"
                      readOnly={true}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <button className="btn btn-lg submit" onClick={this.handleUpdate}>Actualizar Información</button>
        </form>
      </div>
    );
  }

  private handleUpdate(): void {
    if (!this.form) {
      return;
    }
    this.props.onUpdateRequest(utils.serializeFormData(jQuery(this.form).serializeArray()) as AccountDetails);
  }
}

export default GeneralDetails;