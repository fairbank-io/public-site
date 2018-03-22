import * as React from 'react';
import * as jQuery  from 'jquery';

class MobileMenu extends React.Component<{}, {}> {
  el: Element | null;

  public render(): JSX.Element {
    return (
      <div className="mobile-menu" ref={(el) => this.el = el}>
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

  public toggle(): void {
    if (this.el) {
      jQuery(this.el).slideToggle();
    }
  }
}

export default MobileMenu;