import * as React from 'react';
import { Referral } from 'state/data';
import * as API from 'state/api';

// UI
import SimpleModal from 'components/SimpleModal';
import InviteForm from 'panel/InviteForm';
import InvitesTable from 'panel/InvitesTable';

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
        <InvitesTable invitesList={this.props.invitesList} />
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