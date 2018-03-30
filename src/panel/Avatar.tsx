import * as React from 'react';

// Component properties
interface ComponentProps {
  readonly onClick: () => void;
  readonly counter?: number;
  readonly pic?: string;
  readonly targetRef?: (e: Element | null ) => void;
}

// Component state
interface ComponentState {
  pic: string;
}

class Avatar extends React.Component<ComponentProps, ComponentState> {
  static defaultProps: Partial<ComponentProps> = {
    counter: 0,
    pic: ''
  };

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      pic: 'avatar sample-0' + (Math.floor(Math.random() * 5) + 1)
    };
  }

  public render(): JSX.Element {
    // Show badge only if notificationsCounter is > 0
    let badge = null;
    if (this.props.counter) {
      badge = <span className="badge badge-alert">{this.props.counter}</span>;
    }

    return (
      <span className={this.state.pic} onClick={this.props.onClick}>
        {badge}
      </span>
    );
  }
}

export default Avatar;