import * as React from 'react';
import { Referral } from 'state/data';

// Component properties
interface ComponentProps {
  invitesList: Referral[];
}

// Component state
interface ComponentState {}

class InvitesTable extends React.Component<ComponentProps, ComponentState> {
  public render(): JSX.Element {
    return (
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
}

export default InvitesTable;