import * as React from 'react';
import { Referral } from 'state/data';

// Component properties
interface ComponentProps {
  invitesList: Referral[];
}

// Component state
interface ComponentState {}

class Invites extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.newInvites = this.newInvites.bind(this);
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
    }

    return (
      <div>
        <h1>Invitaciones</h1>
        <p>
          Invita a tus amigos a sumarse a la comunidad <strong>FairBank</strong> y recibe importantes
          recomponesas y beneficios.
        </p>
        <button className="btn btn-lg submit" onClick={this.newInvites}>Nueva Invitación</button>
        {contents}
      </div>
    );
  }

  private newInvites(): void {
    // handler
  }
}

export default Invites;