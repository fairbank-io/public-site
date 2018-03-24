import * as React from 'react';
import * as jQuery from 'jquery';
import 'bootstrap/js/dist/modal';

// Component properties
interface ComponentProps {
  // Main title for the modal window
  title: string;

  // Include a header element
  withHeader?: boolean;

  // Include a footer element
  withFooter?: boolean;

  // Close the modal when clicking on the backdrop element
  closeWithBackdrop?: boolean;

  // Display a close button in the header
  showCloseButton?: boolean;

  // Event fired when the modal dialog is about to be displayed
  onWillShow?: () => void;

  // Event fired when the modal has been made visible to the user (will wait for CSS transitions to complete)
  onDidShow?: () => void;

  // Event fired when the modal dialog is about to be hidden
  onWillHide?: () => void;

  // Event fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete)
  onDidHide?: () => void;
}

// Component state
interface ComponentState {}

class Modal extends React.Component<ComponentProps, ComponentState> {
  // Default properties
  static defaultProps: Partial<ComponentProps> = {
    withHeader: true,
    withFooter: false,
    closeWithBackdrop: true,
    showCloseButton: true
  };

  // DOM element
  el: Element | null;

  constructor(props: ComponentProps) {
    super(props);
    this.willHide = this.willHide.bind(this);
    this.didHide = this.didHide.bind(this);
    this.willShow = this.willShow.bind(this);
    this.didShow = this.didShow.bind(this);
  }

  componentDidMount(): void {
    if (!this.el) {
      return;
    }

    jQuery(this.el).on('show.bs.modal', this.willShow);
    jQuery(this.el).on('shown.bs.modal', this.didShow);
    jQuery(this.el).on('hide.bs.modal', this.willHide);
    jQuery(this.el).on('hidden.bs.modal', this.didHide);
    jQuery(this.el).modal({
      backdrop: (this.props.closeWithBackdrop || 'static')
    }).show();
  }

  componentWillUnmount(): void {
    if (!this.el) {
      return;
    }

    jQuery(this.el).off('show.bs.modal', this.willShow);
    jQuery(this.el).off('shown.bs.modal', this.didShow);
    jQuery(this.el).off('hide.bs.modal', this.willHide);
    jQuery(this.el).off('hidden.bs.modal', this.didHide);
    jQuery(this.el).modal('dispose');
  }

  public render(): JSX.Element {
    // Header close button
    let closeButton: JSX.Element | null = null;
    if (this.props.showCloseButton ) {
      closeButton = (
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
      <div className="modal fade" tabIndex={-1} role="dialog" ref={(el) => this.el = el}>
        <div className="modal-dialog" role="document">
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

  private willShow(): void {
    if (this.props.onWillShow) {
      this.props.onWillShow();
    }
  }

  private didShow(): void {
    if (this.props.onDidShow) {
      this.props.onDidShow();
    }
  }

  private willHide(): void {
    if (this.props.onWillHide) {
      this.props.onWillHide();
    }
  }

  private didHide(): void {
    if (this.props.onDidHide) {
      this.props.onDidHide();
    }
  }
}

export default Modal;