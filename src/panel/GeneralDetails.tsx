import * as React from 'react';
import { AccountDetails } from 'state/data';

// Component properties
interface ComponentProps {
  details: AccountDetails;
}

// Component state
interface ComponentState {}

class GeneralDetails extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1>Mi Cuenta</h1>
        <p>...</p>
      </div>
    );
  }
}

export default GeneralDetails;