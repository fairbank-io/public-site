import * as React from 'react';
import Avatar from 'panel/Avatar';
import MobileMenu from 'panel/MobileMenu';
import DesktopMenu from 'panel/DesktopMenu';

class Header extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <section className="menu">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a href="#" className="logo" />
            </div>
            <div className="col-md-6">
              <Avatar />
              <a href="#" className="button logout">
                <span className="icon">
                  <i className="fas fa-sign-out-alt" />
                </span>
                <span>Cerrar Sesión</span>
              </a>
              <MobileMenu />
              <DesktopMenu />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// Module exports
export default Header;