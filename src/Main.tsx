import * as React from 'react';
import { SampleChart } from 'components/SampleChart';

export default class Main extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="content">
        <SampleChart asset="FAIR" label="FAIR price in USD" />
      </div>
    );
  }
}