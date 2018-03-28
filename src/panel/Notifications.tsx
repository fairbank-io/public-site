import * as React from 'react';
import { Notification } from 'state/data';

// Component properties
interface ComponentProps {
  messagesList: Notification[];
}

// Component state
interface ComponentState {}

class Notifications extends React.Component<ComponentProps, ComponentState> {
  public render(): JSX.Element {
    let contents: JSX.Element | null = null;
    if (this.props.messagesList.length === 0) {
      contents = (
        <div className="emtpy-notice">
          <h2>Sin Notificaciones Pendientes</h2>
          <span className="icon">
            <i className="fas fa-flag-checkered" />
          </span>
        </div>
      );
    }

    return (
      <div>
        <h1>Notificaciones</h1>
        <p>
          Es muy importante que te mantengas al dia con los mensajes y avisos asociados a tu cuenta, entre otras
          cosas evitaras así posibles inconvenientes con tu servicio.
        </p>
        {contents}
      </div>
    );
  }
}

export default Notifications;