import { render } from "@testing-library/react";
import React from "react";
import './CurrencyConverter.css'


class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromBase: '',
            toRate: '',
            amount: '',
        };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

handleChange(event) {
    const { name , value } = event.target;

    this.setState({
        [name]: value,
    });
}

handleSubmit(event) {
    event.preventDefault();
    const {amount, fromBase, toRate} = this.state;
}


render () {

    const {amount , fromBase , toRate} = this.state;

    return (
        <div className="container bg-lite">
           <div className="container">
                <div className="text-left">
                    <h2 class="mb-2">Currency Converter</h2>
                </div>
            </div>
        

        <div className="container" id="ratesContainer">
            <div className="row">
                <div className="col-6">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Amount:
                            <input type='number' name='amount' value={amount} onChange={this.handleChange}/>
                        </label>
                    </form>
                </div>
                <div className="col-3">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Base Rate:
                            <select className="form-control" value={fromBase} onChange={this.handleChange}/>
                        </label>
                    </form>
                </div>
                <div className="col-3">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            To Rate:
                            <select className="form-control" value={toRate} onChange={this.handleChange}/>
                        </label>
                    </form>
                </div>
            </div>
        </div>

            <div className="container" id="conversion">
                    <div className="row">
                        <div className="col-8">
                            <h4>Conversion Solution</h4>
                        </div>
                        <div className="col-4">
                            <button>Convert</button>
                        </div>
                    </div>
            </div>
        </div>
    )
  }


}

export default CurrencyConverter;



