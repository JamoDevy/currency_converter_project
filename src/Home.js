
import React from "react";
import { render } from "@testing-library/react";
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetch'; 


class CurrencyConverter extends React.Component {
    constructor(props) {
        super();
        this.state = {
            base: '',
            rates: '',
            loading: true,
        }
    }


render () {
    const {base, rates, loading} = this.state;

    return(
        <React.Fragment>
            <div className="container bg-light">
                <div className="row">
                    <div className="col-4">
                <form className="p-3 form-inline form-inline-sm bg-light dropdown-content">
                    <label>Amount</label><select class="form-control"></select>
                </form>
                </div>

                <div className="col-4">
                <form className="p-3 form-inline form-inline-sm bg-light dropdown-content">                   
                    <label>From Rate</label><select class="form-control"></select>
                </form>               
                </div>

                <div className="col-4">
                <form className="p-3 form-inline form-inline-sm bg-light dropdown-content">                    
                    <label>To Rate</label><select class="form-control"></select>
                </form>               
                </div>
                <div className="converter-submit">
                    <button className="submit-conversion">Convert</button>
                </div>
             </div>
           </div>
        </React.Fragment>
    )
  }
}

export default CurrencyConverter;