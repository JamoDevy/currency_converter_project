import React from "react";
import currencies from "./utils/currencies.js";
import { checkStatus, json} from "./utils/fetch";
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
    }

    componentDidMount() {
        const {baseAcronym, quoteAcronym} = this.state;
        this.getRate(baseAcronym, quoteAcronym);
    }

    getRate = (base, quote) => {
        this.setState({loading: true});
        fetch(`https://www.frankfurter.app/latest?from=${base}`)
            .then(checkStatus)
            .then(json)
            .then(data => {
                if (data.error) {
                    throw new Error(data.error)
                }

                const rate = data.rates[quote];
                const name = data.rates[base];

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
        this.getRate(this.state.baseAcronym, quoteAcronym)
    }

    changeQuoteValue = (event) => {
        const baseValue = this.convert(event.target.value, this.state.rate, this.toBase);
        this.setState({
            quoteValue: event.target.value,
            baseValue,
        });
    }

render() {

    const {rate , baseAcronym, baseValue, quoteAcronym, quoteValue, loading} = this.state;

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
                            <label>Base Currency</label>
                            <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control">{currencyOptions}
                            </select>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                {/* <div className="input-group-text">{currencies[baseAcronym]}</div> */}
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
                            <label>Target Currency</label>
                            <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control">{currencyOptions}
                            </select>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                     
                                <p className="bg-white px-3 py-2">{quoteValue}</p>  
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="container" id="solution">
                    <h2 className="mb-2">Conversion Solution</h2>
                    <h4 className="conversionSolution">1 {baseAcronym} to 1 {quoteAcronym} = {rate.toFixed(4)} {currencies[quoteAcronym]} </h4>
                </div>
            </div>
        </React.Fragment>
    )
}

}

export default SingleConverter;