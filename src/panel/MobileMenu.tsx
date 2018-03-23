import * as React from 'react';
import * as jQuery  from 'jquery';
import { NavLink } from 'react-router-dom';

class MobileMenu extends React.Component<{}, {}> {
  el: Element | null;

  public render(): JSX.Element {
    return (
      <div className="mobile-menu" ref={(el) => this.el = el}>
        <ul>
          <li>
            <NavLink to={'/panel'} className={'router-navlink'}>
              <button className="btn">Mi Cuenta</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/panel/transactions'} className={'router-navlink'}>
              <button className="btn">Transacciones</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/panel/invites'} className={'router-navlink'}>
              <button className="btn">Inivitaciones</button>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/panel/notifications'} className={'router-navlink'}>
              <button className="btn">Notificaciones</button>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }

  public toggle(): void {
    if (this.el) {
      jQuery(this.el).slideToggle();
    }
  }
}

export default MobileMenu;