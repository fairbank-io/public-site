import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

class Hello extends React.Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    let level = this.props.enthusiasmLevel || 0;

    if (level <= 0) {
      throw new Error('Not enthusiastic enough! :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {this.props.name + this.getEnthusiasmChars(level)}
        </div>
      </div>
    );
  }

  private getEnthusiasmChars(numChars: number): string {
    return Array(numChars + 1).join('!');
  }
}

export default Hello;
