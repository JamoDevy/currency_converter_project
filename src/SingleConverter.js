import React from "react";
import currencies from "./utils/currencies.js";
import Chart from 'chart.js';
import { checkStatus, json} from "./utils/fetch";
import { Link } from "react-router-dom";
import './SingleConverter.css';



class SingleConverter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 1,
            baseAcronym: 'USD',
            baseValue: 1,
            quoteAcronym: 'AUD',
            quoteValue: 1.5,
            loading: false,
        };

        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const {baseAcronym, quoteAcronym} = this.state;
        this.getRate(baseAcronym, quoteAcronym);
        this.getHistoricalRates(baseAcronym, quoteAcronym);
    }

    getRate = (base, quote) => {
        this.setState({loading: true});
        fetch(`https://api.frankfurter.app/latest?from=${base}`)
            .then(checkStatus)
            .then(json)
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }

                const rate = data.rates[quote];
                // const name = data.rates[base];

                this.setState({
                    rate,
                    quoteValue: Number((this.state.baseValue * rate).toFixed(3)),
                    loading: false,
                });
            })
            .catch(error => console.error(error.message));
    }

    toBase(amount, rate) {
        return amount * (1/rate);
    }

    toQuote(amount, rate) {
        return amount * rate;
    }

    convert(amount, rate, equation) {
        const input = parseFloat(amount);
            if (Number.isNaN(input)) {
                return '';
            }
        return equation(input, rate).toFixed(3);
    }

    changeBaseAcronym = (event) => {
        const baseAcronym = event.target.value;
        this.setState({baseAcronym});
        this.getRate(baseAcronym, this.state.quoteAcronym);
        this.getHistoricalRates(baseAcronym, this.state.quoteAcronym);
    }

    changeBaseValue = (event) => {
        const quoteValue = this.convert(event.target.value, this.state.rate, this.toQuote);
        this.setState({
            baseValue: event.target.value,
            quoteValue,
        });
    }

    changeQuoteAcronym =(event) => {
        const quoteAcronym = event.target.value;
        this.setState({quoteAcronym});
        this.getRate(this.state.baseAcronym, quoteAcronym);
        this.getHistoricalRates(this.state.baseAcronym, quoteAcronym);
    }

    changeQuoteValue = (event) => {
        const baseValue = this.convert(event.target.value, this.state.rate, this.toBase);
        this.setState({
            quoteValue: event.target.value,
            baseValue,
        });
    }

    getHistoricalRates = (base, quote) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        
        fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
          .then(checkStatus)
          .then(json)
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[quote]);
            const chartLabel = `${base}/${quote}`;
            this.buildChart(chartLabels, chartData, chartLabel);
          })
          .catch(error => console.error(error.message));
      }

      buildChart = (labels, data, label) => {
        
        const chartRef = this.chartRef.current.getContext("2d");
        
        if (typeof this.chart !== "undefined") {
          this.chart.destroy();
        }

        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                tension: 0,
              }
            ]
          },
          options: {
            responsive: true,
          }
        })
      }

render() {

    const {rate , baseAcronym, baseValue, quoteAcronym, quoteValue} = this.state;

    const currencyOptions = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);

   
    return (
        <React.Fragment>
            <div className="container">
                <h2 className="conversionHeader">Currency Converter</h2>
            </div>

            <div className="container" id="converterBox">
                <div className="row">
                    <div className="col-4">
                        <form className="form-group">
                            <label id="currencyLabels">Base Currency:</label>
                            <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control">{currencyOptions}
                            </select>
                            
                            <small className="text-secondary">{currencies[baseAcronym].name}</small>
                            
                            <div className="input-group">
                                <div className="input-group-prepend" id="unitAmount">
                                    <label id="baseUnitAmounts" htmlFor="base">Base Unit Amount:</label>
                                    <input id="base" className="form-control-sm" value={baseValue} onChange={this.changeBaseValue} type='number'/>  
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <h3 id="equalTo">=</h3>
                    </div>
                    <div className="col-4">
                        <form className="form-group">
                            <label id="currencyLabels">Target Currency:</label>
                            <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control">{currencyOptions}
                            </select>
                            <small className="text-secondary">{currencies[quoteAcronym].name}</small>
                            <div className="input-group">
                                <div className="input-group-prepend" id="targetQuote">
                                    <label id="targetUnitAmounts">Target Conversion:</label>
                                    <p className="bg-white px-3 py-2">{quoteValue}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="container" id="solution">
                    <h2 className="mb-2">Conversion Solution</h2>
                    <h4 className="conversionSolution">1 {baseAcronym} to 1 {quoteAcronym} = {rate.toFixed(4)} {currencies.quoteAcronym} </h4>
                </div>
            </div>

            <div className="container">
                <Link to="/">Exchange Rates Table</Link></div>
            <canvas ref={this.chartRef} />
        </React.Fragment>
    )
}

}

export default SingleConverter;