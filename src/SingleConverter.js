import React from "react";
import currencies from "./utils/currencies";
import { checkStatus } from "./utils/fetch";
import './SingleConverter.css'



class SingleConverter extends React.Component {
    constructor(props) {
        super(props);

    }



render() {

    return (
        <React.Fragment>
            <div className="container">
                <h2 className="conversionHeader">Currency Converter</h2>
            </div>

            <div className="container" id="converterBox">
                <div className="row">
                    <div className="col-4">
                        <form className="form-group">
                            <label>Start Base</label>
                            <select className="form-control"></select>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"></div>  
                                    <input id="base" className="form-control-sm" type='number'/>  
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <h3 id="equalTo">=</h3>
                    </div>
                    <div className="col-4">
                        <form className="form-group">
                            <label>To Base</label>
                            <select className="form-control"></select>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"></div>  
                                    <input id="base" className="form-control-sm" type='number'/>  
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="container" id="solution">
                    <h2 className="mb-2">Conversion Solution</h2>
                    <h4 className="conversionSolution">'Amount' base currency to 'Amount' new currency = Rate</h4>
                </div>
            </div>
        </React.Fragment>
    )
}

}

export default SingleConverter;