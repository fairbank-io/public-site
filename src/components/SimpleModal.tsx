import * as React from 'react';
import * as jQuery from 'jquery';

// Component properties
interface ComponentProps {
  // Main title for the modal window
  title: string;

  // Animation duration in ms
  animationDuration?: number;

  // Include a header element
  withHeader?: boolean;

  // Include a footer element
  withFooter?: boolean;

  // Close the modal when clicking on the backdrop element
  closeWithBackdrop?: boolean;

  // Display a close button in the header
  showCloseButton?: boolean;

  // Event fired when the modal has been made visible to the user
  onShow?: () => void;

  // Event fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete)
  onHide?: () => void;
}

// Component state
interface ComponentState {}

class SimpleModal extends React.Component<ComponentProps, ComponentState> {
  // Default properties
  static defaultProps: Partial<ComponentProps> = {
    withHeader: true,
    withFooter: false,
    animationDuration: 250,
    closeWithBackdrop: true,
    showCloseButton: true
  };

  // DOM elements
  overlay: Element | null;
  dialog: Element | null;

  constructor(props: ComponentProps) {
    super(props);
    this.close = this.close.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  componentDidMount(): void {
    if (!this.overlay || !this.dialog) {
      return;
    }

    if (this.props.closeWithBackdrop) {
      jQuery(this.overlay).on('click', null, null, (e: JQuery.Event) => {
        e.preventDefault();
        if (this.dialog) {
          if (!jQuery(e.target).closest(this.dialog).length) {
            this.close();
          }
        }
      });
    }

    jQuery(this.overlay).fadeIn(this.props.animationDuration || 250, this.onShow);
  }

  componentWillUnmount(): void {
    if (!this.overlay) {
      return;
    }
    jQuery(this.overlay).off('click');
  }

  public render(): JSX.Element {
    // Header close button
    let closeButton: JSX.Element | null = null;
    if (this.props.showCloseButton ) {
      closeButton = (
        <button type="button" className="close" onClick={this.close}>
          <span aria-hidden="true">&times;</span>
        </button>
      );
    }

    // Build header
    let header: JSX.Element | null = null;
    if (this.props.withHeader) {
      header = (
        <div className="modal-header">
          <h5 className="modal-title">{this.props.title}</h5>
          {closeButton}
        </div>
      );
    }

    // Build footer
    let footer: JSX.Element | null = null;
    if (this.props.withFooter) {
      footer = (
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">Save changes</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      );
    }

    return (
      <div className="modal modal-open" ref={(el) => this.overlay = el}>
        <div className="modal-dialog" ref={(el) => this.dialog = el}>
          <div className="modal-content">
            {header}
            <div className="modal-body">
              {this.props.children}
            </div>
            {footer}
          </div>
        </div>
      </div>
    );
  }

  public close(): void {
    if (!this.overlay) {
      return;
    }

    jQuery(this.overlay).fadeOut(this.props.animationDuration || 250, this.onHide);
  }

  private onShow(): void {
    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  private onHide(): void {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }
}

export default SimpleModal;