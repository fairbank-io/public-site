import * as React from 'react';
import * as jQuery from 'jquery';
import Popper from 'popper.js';
import { NavLink } from 'react-router-dom';

// Component properties
interface ComponentProps {
  target: Element | string;
}

// Component state
interface ComponentState {}

class DesktopMenu extends React.Component<ComponentProps, ComponentState> {
  el: Element | null;
  popover: Popper;

  constructor(props: ComponentProps) {
    super(props);
    this.setupPopover = this.setupPopover.bind(this);
    this.autoClose = this.autoClose.bind(this);
  }

  componentDidMount(): void {
    jQuery(document).on('click', null, null, this.autoClose);
  }

  componentWillUnmount(): void {
    jQuery(document).off('click', this.autoClose);
  }

  public render(): JSX.Element {
    return (
      <div className="desktop-menu popper large" ref={(e) => this.el = e}>
        <ul>
            <li>
              <NavLink to={'/panel'} className={'router-navlink'}>
                <div className="media">
                  <div className="media-left">
                    <span className="icon account" />
                  </div>
                  <div className="media-content">
                    <p className="title">Mi Cuenta</p>
                    <p className="subtitle">Consulta y actualiza tu información</p>
                  </div>
                </div>
              </NavLink>
            </li>
          <li>
            <NavLink to={'/panel/transactions'} className={'router-navlink'}>
              <div className="media">
                <div className="media-left">
                  <span className="icon transactions" />
                </div>
                <div className="media-content">
                  <p className="title">Transacciones</p>
                  <p className="subtitle">Realiza transacciones nuevas y consulta la información relacionada</p>
                </div>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/panel/invites'} className={'router-navlink'}>
              <div className="media">
                <div className="media-left">
                  <span className="icon invites" />
                </div>
                <div className="media-content">
                  <p className="title">Invitaciones</p>
                  <p className="subtitle">Invita a tus amigos y recibe importantes beneficios</p>
                </div>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/panel/market'} className={'router-navlink'}>
              <div className="media">
                <div className="media-left">
                  <span className="icon market" />
                </div>
                <div className="media-content">
                  <p className="title">Mercado</p>
                  <p className="subtitle">Mantente al dia con los últimos movimientos del mercado</p>
                </div>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/panel/notifications'} className={'router-navlink'}>
              <div className="media">
                <div className="media-left">
                  <span className="icon notifications" />
                </div>
                <div className="media-content">
                  <p className="title">Notificaciones</p>
                  <p className="subtitle">Consulta eventos importantes relacionados con tu cuenta</p>
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
        <div className="popper-arrow" x-arrow="" />
      </div>
    );
  }

  public toggle(): void {
    if (!this.el) {
      return;
    }

    if (!this.popover) {
      this.setupPopover();
    }

    this.popover.update();
    jQuery(this.el).fadeToggle(250);
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

  private autoClose(e: JQuery.Event): void {
    if (this.el) {
      // Detect clicks outside the popper and the target element
      if (!jQuery(e.target).closest(this.el).length && !jQuery(e.target).closest(this.props.target).length ) {
        // Is the menu displayed?
        if (jQuery(this.el).is(':visible')) {
          this.toggle();
        }
      }
    }
  }
}

export default DesktopMenu;