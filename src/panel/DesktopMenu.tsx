import * as React from 'react';
import * as jQuery from 'jquery';
import Popper from 'popper.js';

// Component properties
interface ComponentProps {
  target: Element | string;
}

// Component state
interface ComponentState {}

class DesktopMenu extends React.Component<ComponentProps, ComponentState> {
  el: Element | null;
  popover: Popper;

  public render(): JSX.Element {
    return (
      <div className="desktop-menu popper large" ref={(e) => this.el = e}>
        <ul>
          <li>
            <div className="media">
              <div className="media-left">
                <span className="icon account" />
              </div>
              <div className="media-content">
                <p className="title">Mi Cuenta</p>
                <p className="subtitle">Consulta y actualiza tu información</p>
              </div>
            </div>
          </li>
          <li>
            <div className="media">
              <div className="media-left">
                <span className="icon transactions" />
              </div>
              <div className="media-content">
                <p className="title">Transacciones</p>
                <p className="subtitle">Realiza transacciones nuevas y consulta la información relacionada</p>
              </div>
            </div>
          </li>
          <li>
            <div className="media">
              <div className="media-left">
                <span className="icon invites" />
              </div>
              <div className="media-content">
                <p className="title">Invitaciones</p>
                <p className="subtitle">Invita a tus amigos y recibe importantes beneficios</p>
              </div>
            </div>
          </li>
          <li>
            <div className="media">
              <div className="media-left">
                <span className="icon market" />
              </div>
              <div className="media-content">
                <p className="title">Mercado</p>
                <p className="subtitle">Mantente al dia con los últimos movimientos del mercado</p>
              </div>
            </div>
          </li>
          <li>
            <div className="media">
              <div className="media-left">
                <span className="icon notifications" />
              </div>
              <div className="media-content">
                <p className="title">Notificaciones</p>
                <p className="subtitle">Consulta eventos importantes relacionados con tu cuenta</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="popper-arrow" x-arrow="" />
      </div>
    );
  }

  public toggle(): void {
    if (!this.popover) {
      this.setupPopover();
    }

    if (this.popover && this.el) {
      this.popover.update();
      jQuery(this.el).fadeToggle(250);
    }
  }

  private setupPopover(): void {
    let target: Element | null = null;
    if (typeof this.props.target === 'string') {
      let t = document.querySelector('section.menu span.avatar');
      if (t) {
        target = t;
      }
    } else {
      target = this.props.target;
    }

    if (target && this.el) {
      this.popover = new Popper(target, this.el, {
        placement: 'bottom'
      });
    }
  }
}

export default DesktopMenu;