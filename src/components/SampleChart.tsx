import * as React from 'react';
import { ChartPoint, Chart } from 'chart.js';
import axios from 'axios';

enum Period {
  HOUR  = 'hour',
  DAY   = 'day',
  WEEK  = 'week',
  MONTH = 'month',
  YEAR  = 'year'
}

interface Props {
  readonly asset: string;
  readonly label: string;
  readonly period?: Period;
}

interface State {
  asset: string;
  data: Array<ChartPoint>;
  period: Period;
  currentPrice: number;
}

interface APIQuery {
  fsym: string;
  tsym: string;
  aggregate?: number;
  limit?: number;
}

interface APIDataItem {
  time: number;
  high: number;
}

class SampleChart extends React.Component<Props, State> {
  private canvas: HTMLCanvasElement | null;
  private chart: Chart;
  private baseUrl: string = 'https://min-api.cryptocompare.com/data/';
  private defaultChartOptions: object = {
    type: 'line',
    data: {
      datasets: []
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 6,
          hoverRadius: 4
        }
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: false,
          ticks: {
            beginAtZero: false,
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'series'
        }]
      }
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPrice: 0,
      asset: this.props.asset,
      period: this.props.period || Period.WEEK,
      data: []
    };
    this.fetchChartData = this.fetchChartData.bind(this);
  }

  componentDidMount() {
    this.chart = new Chart(this.canvas as HTMLCanvasElement, this.defaultChartOptions);
    this.fetchCurrentPrice();
    this.fetchChartData(this.state.period);
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  public render(): JSX.Element {
    return (
      <div>
        <p>Price information: <b>{this.props.asset}</b></p>
        <p>Current price is: <b>${this.state.currentPrice} USD</b></p>
        <select value={this.state.period} onChange={(e) => this.fetchChartData(e.target.value as Period)}>
          <option value={Period.HOUR}>Hour</option>
          <option value={Period.DAY}>Day</option>
          <option value={Period.WEEK}>Week</option>
          <option value={Period.MONTH}>Month</option>
          <option value={Period.YEAR}>Year</option>
        </select>
        <div className="chartContainer">
          <canvas ref={(c) => this.canvas = c} width="300" height="200" />
        </div>
      </div>
    );
  }

  private fetchChartData(p: Period) {
    let url: string = '';
    let params: APIQuery = {
      fsym: this.state.asset,
      tsym: 'USD'
    };
    switch (p) {
      case Period.HOUR:
        // Every minute for the last hour
        url = 'histominute';
        params.limit = 60;
        break;
      case Period.DAY:
        // Every 15 minutes for the last day
        url = 'histominute';
        params.limit = 96;
        params.aggregate = 15;
        break;
      case Period.WEEK:
        // Every hour for the last week
        url = 'histohour';
        params.limit = 168;
        break;
      case Period.MONTH:
        // Every day the last 30 days
        url = 'histoday';
        params.limit = 30;
        break;
      case Period.YEAR:
        // Every week for the last year
        url = 'histoday';
        params.limit = 52;
        params.aggregate = 7;
        break;
      default:
        // Invalid period value, do nothing!
        return;
    }

    let points: Array<ChartPoint> = [];
    axios.get(this.baseUrl + url, {params: params})
      .then((r) => {
        // Prepare data
        r.data.Data.map((el: APIDataItem) => {
          points.push({
            x: new Date(el.time * 1000),
            y: el.high
          });
        });

        // Update state and render chart
        this.setState({
          period: p,
          data: points
        });
        this.updateChart();
      });
  }

  private fetchCurrentPrice() {
    axios.get(this.baseUrl + 'price', {
      params: {
        fsym: this.props.asset,
        tsyms: 'USD'
      }
    }).then((r) => {
      this.setState({currentPrice: r.data.USD});
    });
  }

  private updateChart() {
    this.chart.data.datasets = [{
      label: this.props.label,
      backgroundColor: 'rgba(145, 100, 164, 0.7)',
      borderColor: 'rgb(145, 100, 164)',
      fill: 'origin',
      data: this.state.data,
      lineTension: 0.2
    }];
    this.chart.update(500);
  }
}

// Export component class and available period values
export {
  SampleChart,
  Period
};