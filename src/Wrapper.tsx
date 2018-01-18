import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SampleChart, Asset } from './components/SampleChart';

// Route components should extend 'RouteComponentProps' to inherit
// the injected properties from 'react-router'
interface Props extends RouteComponentProps<void> {}

class Wrapper extends React.Component<Props, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <SampleChart asset={this.getAssetName() as Asset} label={this.getAssetName() + ' price in USD'}/>
      </div>
    );
  }

  private getAssetName(): string {
    return this.props.match.url.split('/')[1].toString().toUpperCase();
  }
}

export default Wrapper;