/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Overview from './Overview';
import Request from './Request';
import fixTextarea from './fixTextarea';

export default React.createClass({
    componentDidMount(){

        $(document.body).on('click', "#request-tablink", fixTextarea);
    },
    render(){

        const {current}=this.props;

        return !$.isEmptyObject(current) ? (
            <div className="logger-right">
                <div className="logger-right-content">
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="log-detail-first-tab active">
                            <a href="#overview-panel" aria-controls="overview-panel" role="tab"
                               data-toggle="tab">
                                Overview
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#response-panel" id="response-tablink" aria-controls="response-panel" role="tab"
                               data-toggle="tab">
                                Response
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#request-panel" id="request-tablink" aria-controls="request-panel" role="tab"
                               data-toggle="tab">
                                Request
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane overview-panel active" id="overview-panel">
                            <Overview current={current}/>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="response-panel">

                        </div>
                        <div role="tabpanel" className="tab-pane" id="request-panel">
                            <Request requestData={current.request}/>
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    }
});
