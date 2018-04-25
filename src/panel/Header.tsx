import * as React from 'react';
import Avatar from 'panel/Avatar';
import MobileMenu from 'panel/MobileMenu';
import DesktopMenu from 'panel/DesktopMenu';

// Component properties
interface ComponentProps {
  readonly notificationsCounter: number;
  readonly avatar: string;
  readonly onLogoutRequest: () => void;
}

// Component state
interface ComponentState {}

class Header extends React.Component<ComponentProps, ComponentState> {
  mobileMenu: MobileMenu | null;
  desktopMenu: DesktopMenu | null;

  constructor(props: ComponentProps) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  public render(): JSX.Element {
    return (
      <section className="menu">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a href="#" className="logo" />
            </div>
            <div className="col-md-6">
              <Avatar
                pic={this.props.avatar}
                counter={this.props.notificationsCounter}
                onClick={this.toggleMenu}
              />
              <span className="logout" onClick={this.props.onLogoutRequest}>
                <span className="icon">
                  <i className="fas fa-sign-out-alt" />
                </span>
                <span>Cerrar Sesión</span>
              </span>
              <MobileMenu ref={(el) => this.mobileMenu = el} />
              <DesktopMenu target={'section.menu span.avatar'} ref={(el) => this.desktopMenu = el} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  private toggleMenu(): void {
    if (window.outerWidth <= 768 && this.mobileMenu ) {
      this.mobileMenu.toggle();
      return;
    }

    if (this.desktopMenu) {
      this.desktopMenu.toggle();
    }
  }
}

export default Header;