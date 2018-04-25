import * as React from 'react';
import { CSSProperties } from 'react';

// Component properties
interface ComponentProps {
  readonly onClick: () => void;
  readonly counter?: number;
  readonly pic?: string;
}

// Component state
interface ComponentState {
  holder: string;
}

class Avatar extends React.Component<ComponentProps, ComponentState> {
  static defaultProps: Partial<ComponentProps> = {
    counter: 0,
    pic: ''
  };

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      holder: 'avatar sample-0' + (Math.floor(Math.random() * 5) + 1)
    };
  }

  public render(): JSX.Element {
    // Show badge only if notificationsCounter is > 0
    let badge = null;
    if (this.props.counter) {
      badge = <span className="badge badge-alert">{this.props.counter}</span>;
    }

    // Set user pic, if any
    let st: CSSProperties = {};
    if (this.props.pic !== '') {
      st.backgroundImage = 'url(' + this.props.pic + ')';
    }

    return (
      <span
        className={this.state.holder}
        onClick={this.props.onClick}
        style={st}
      >
        {badge}
      </span>
    );
  }
}

export default Avatar;