import * as React from 'react';

class MobileMenu extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="mobile-menu">
        <ul>
          <li>
            <button className="btn">Mi Cuenta</button>
          </li>
          <li>
            <button className="btn">Transacciones</button>
          </li>
          <li>
            <button className="btn">Inivitaciones</button>
          </li>
          <li>
            <button className="btn">Notificaciones</button>
          </li>
        </ul>
      </div>
    );
  }
}

// Module exports
export default MobileMenu;