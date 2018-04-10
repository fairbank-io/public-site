import * as React from 'react';

// Component properties
interface ComponentProps {
  animated: boolean;
  stripped: boolean;
  type: string;
  value: number;
}

// Component state
interface ComponentState {}

class ProgressBar extends React.Component<ComponentProps, ComponentState> {
  public render() {
    let styles: string[] = ['progress-bar'];
    styles.push('w-' + this.props.value);
    styles.push('bg-' + this.props.type);
    if (this.props.stripped) {
      styles.push('progress-bar-striped');
    }
    if (this.props.animated) {
      styles.push('progress-bar-animated');
    }
    return (
      <div className="progress">
        <div className={styles.join(' ')} role="progressbar" />
      </div>
    );
  }
}

export default ProgressBar;