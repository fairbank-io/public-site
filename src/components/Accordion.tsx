import * as React from 'react';
import * as jQuery from 'jquery';

// Component properties
interface ComponentProps {
  openFirst?: boolean;
  allowAllClosed?: boolean;
}

class Accordion extends React.Component<ComponentProps, {}> {
  // Default properties
  static defaultProps: Partial<ComponentProps> = {
    openFirst: true,
    allowAllClosed: false
  };

  // Parent DOM element
  holder: Element | null;

  constructor(props: ComponentProps) {
    super(props);
  }

  componentDidMount(): void {
    if (this.holder) {
      let allowAllClosed: boolean | undefined = this.props.allowAllClosed;

      // Close all cards
      let accordion: JQuery = jQuery(this.holder);
      accordion.find('div.card-body').hide();

      // Setup togglers
      let cards: JQuery = accordion.find('div.card-body');
      let togglers: JQuery = accordion.find('div.card-header');
      togglers.each(function(i: number, k: Element) {
        jQuery(k).on('click', function () {
          let clickedOpen: boolean = jQuery(k).hasClass('open');
          if (clickedOpen && !allowAllClosed) {
            return;
          }

          if (clickedOpen && allowAllClosed) {
            jQuery(cards).slideUp();
            togglers.removeClass('open');
            return;
          }

          // Open card
          jQuery(cards).slideUp();
          jQuery(cards[i]).slideDown();

          // Mark togglers
          togglers.removeClass('open');
          jQuery(togglers[i]).addClass('open');
        });
      });

      // Open first card automatically
      if (this.props.openFirst) {
        jQuery(cards[0]).slideDown();
      }
    }
  }

  componentWillUnmount(): void {
    if (this.holder) {
      jQuery(this.holder).find('div.card-header').off('click');
    }
  }

  public render(): JSX.Element {
    return (
      <div ref={(el) => this.holder = el}>
        {this.props.children}
      </div>
    );
  }
}

export default Accordion;