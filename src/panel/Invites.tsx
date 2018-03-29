import * as React from 'react';
import { Referral } from 'state/data';
import * as API from 'state/api';

// UI
import SimpleModal from 'components/SimpleModal';
import InviteForm from 'panel/InviteForm';

// Component properties
interface ComponentProps {
  invitesList: Referral[];
  onNewInvite: (req: API.RequestNewInvite) => void;
}

// Component state
interface ComponentState {
  showModal: boolean;
}

class Invites extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  public render(): JSX.Element {
    let contents: JSX.Element | null = null;
    if (this.props.invitesList.length === 0) {
      contents = (
        <div className="emtpy-notice">
          <h2>Sin Invitaciones Registradas</h2>
          <span className="icon">
            <i className="fas fa-paper-plane" />
          </span>
        </div>
      );
    } else {
      contents = (
        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Destinatario</th>
            <th className="d-none d-md-table-cell">Código</th>
            <th>Estado</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.invitesList.map(function (k: Referral, i: number) {
              return (
                <tr key={k.code}>
                  <td>{i + 1}</td>
                  <td>{k.email}</td>
                  <td className="d-none d-md-table-cell">{k.code}</td>
                  <td>
                    {
                      k.accepted ?
                      <span className="badge badge-success">Activa</span> :
                      <span className="badge badge-danger">Pendiente</span>
                    }
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      );
    }

    // Modal
    let modal: JSX.Element | null = null;
    if (this.state.showModal) {
      modal = (
        <SimpleModal title={'Enviar Nueva Invitación'} onHide={() => this.setState({showModal: false})}>
          <InviteForm onSubmit={this.props.onNewInvite} />
        </SimpleModal>
      );
    }

    return (
      <div>
        {modal}
        <h1>Invitaciones</h1>
        <p>
          Invita a tus amigos a sumarse a la comunidad <strong>FairBank</strong> y recibe importantes
          recomponesas y beneficios.
        </p>
        <button className="btn btn-lg submit" onClick={() => this.setState({showModal: true})}>Nueva Invitación</button>
        {contents}
      </div>
    );
  }
}

export default Invites;