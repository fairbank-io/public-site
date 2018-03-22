import * as React from 'react';

// Component properties
interface ComponentProps {
  readonly counter?: number;
  readonly onClick: () => void;
  readonly targetRef?: (e: Element | null ) => void;
}

class Avatar extends React.Component<ComponentProps, {}> {
  constructor(props: ComponentProps) {
    super(props);
  }

  public render(): JSX.Element {
    // Show badge only if notificationsCounter is > 0
    let badge = null;
    if (this.props.counter) {
      badge = <span className="badge badge-alert">{this.props.counter}</span>;
    }

    return (
      <span className="avatar" onClick={this.props.onClick}>
        {badge}
      </span>
    );
  }
}

export default Avatar;