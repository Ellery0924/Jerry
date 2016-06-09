/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Overview from './Overview';

export default React.createClass({
    render(){

        const {current}=this.props;

        return (
            <div className="logger-right-content">
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="log-detail-first-tab active">
                        <a href="#overview-panel" aria-controls="overview-panel" role="tab"
                           data-toggle="tab">
                            Overview
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#request-panel" aria-controls="request-panel" role="tab" data-toggle="tab">
                            Request
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#response-panel" aria-controls="response-panel" role="tab" data-toggle="tab">
                            Response
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane overview-panel active" id="overview-panel">
                        <Overview current={current}/>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="request-panel">
                    </div>
                    <div role="tabpanel" className="tab-pane" id="response-panel">

                    </div>
                </div>
            </div>
        );
    }
});
