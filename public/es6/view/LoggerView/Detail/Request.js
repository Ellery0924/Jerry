/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import InfoItem from './InfoItem';
import BodyContainer from './BodyContainer';

export default React.createClass({
    render(){

        const {requestData}=this.props;

        return (
            <div className="log-request">
                <div className="panel-group" role="tablist" aria-multiselectable="true" id="request-query-panel">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#request-query-panel"
                                   href="#query-accordion-content" id="query-accordion-control"
                                   aria-expanded="false" aria-controls="query-accordion-content">
                                    Query String Parameters
                                </a>
                            </h4>
                        </div>
                        <div id="query-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="query-accordion-control">
                            <div className="panel-body">
                                {!$.isEmptyObject(requestData.query) ? Object.keys(requestData.query).map(key=>
                                    <InfoItem key={"query-string-parameter-"+key} name={key}
                                              value={requestData.query[key]}/>) : "无"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group" role="tablist" aria-multiselectable="true" id="request-body-panel">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#request-body-panel"
                                   href="#request-body-accordion-content" id="request-body-accordion-control"
                                   aria-expanded="false" aria-controls="request-body-accordion-content">
                                    JSON Body
                                </a>
                            </h4>
                        </div>
                        <div id="request-body-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="request-body-accordion-control">
                            <BodyContainer body={requestData.body}/>
                        </div>
                    </div>
                </div>
                <div className="panel-group" role="tablist" aria-multiselectable="true" id="request-raw-panel">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#request-raw-panel"
                                   href="#request-raw-accordion-content" id="request-raw-accordion-control"
                                   aria-expanded="false" aria-controls="request-raw-accordion-content">
                                    Raw Body
                                </a>
                            </h4>
                        </div>
                        <div id="request-raw-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="request-raw-accordion-control">
                            <div className="panel-body">
                                {requestData.raw ? requestData.raw : "无"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});