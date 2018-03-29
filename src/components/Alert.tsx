import * as React from 'react';
import * as jQuery from 'jquery';

// Component properties
interface ComponentProps {
  type: string;
  onClose?: () => void;
}

// Component state
interface ComponentState {}

class Alert extends React.Component<ComponentProps, ComponentState> {
  holder: Element | null;

  constructor(props: ComponentProps) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount(): void {
    if (this.holder) {
      jQuery(this.holder).hide();
    }
  }

  componentDidUpdate(): void {
    if (this.holder && this.props.children) {
      if (!jQuery(this.holder).is(':visible')) {
        jQuery(this.holder).hide().slideDown();
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div className={'alert alert-' + this.props.type} ref={(el) => this.holder = el}>
        <button type="button" className="close" onClick={this.close}>
          <span>&times;</span>
        </button>
        {this.props.children}
      </div>
    );
  }

  private close(): void {
    if (this.holder) {
      jQuery(this.holder).slideUp(() => {
        if (this.props.onClose) {
          this.props.onClose();
        }
      });
    }
  }
}

export default Alert;