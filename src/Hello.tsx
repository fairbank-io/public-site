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
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('Not enthusiastic enough! :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + this.getEnthusiasmChars(enthusiasmLevel)}
        </div>
      </div>
    );
  }

  private getEnthusiasmChars(numChars: number): string {
    return Array(numChars + 1).join('!');
  }
}

export default Hello;
