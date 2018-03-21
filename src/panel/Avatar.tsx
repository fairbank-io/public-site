import * as React from 'react';

class Footer extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <span className="avatar">
        <span className="badge badge-alert">10</span>
      </span>
    );
  }
}

// Module exports
export default Footer;