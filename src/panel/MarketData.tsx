import * as React from 'react';
import { SampleChart, Asset } from 'components/SampleChart';

class MarketData extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>Información de Mercado</h1>
        <p>Mantente al dia con la información y tendencias del mercado.</p>
        <div className="market-chart">
          <SampleChart asset={Asset.FAIR} label={'Valor de Referencia'} />
        </div>
      </div>
    );
  }
}

export default MarketData;