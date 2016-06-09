/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import InfoItem from './InfoItem';

export default React.createClass({
    render(){

        const {current}=this.props;

        return (
            <div className="log-overview">
                <div className="panel-group" id="overview-general-panel" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="general-accordion-control">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#overview-general-panel"
                                   href="#general-accordion-content"
                                   aria-expanded="true" aria-controls="collapseOne">
                                    General
                                </a>
                            </h4>
                        </div>
                        <div id="general-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="general-accordion-control">
                            <div className="panel-body">
                                <InfoItem name="method" value={current.method}/>
                                <InfoItem name="url" value={current.url}/>
                                <InfoItem name="status" value={current.statusCode}/>
                                <InfoItem name="time" value={current.time}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group" id="overview-response-panel" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="response-accordion-control">
                            <h4 className="panel-title">
                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#overview-response-panel"
                                   href="#response-accordion-content" aria-expanded="true"
                                   aria-controls="collapseThree">
                                    Response Headers
                                </a>
                            </h4>
                        </div>
                        <div id="response-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="response-accordion-content">
                            <div className="panel-body">
                                {current.response ? Object.keys(current.response.headers).map(key=> {

                                    var value = current.response.headers[key];
                                    return <InfoItem key={"response-header"+key} name={key} value={value}/>
                                }) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group" id="overview-request-panel" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="response-accordion-control">
                            <h4 className="panel-title">
                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#overview-request-panel"
                                   href="#request-accordion-content" aria-expanded="true" aria-controls="request-accordion-content">
                                    Request Headers
                                </a>
                            </h4>
                        </div>
                        <div id="request-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="request-accordion-control">
                            <div className="panel-body">
                                {current.request ? Object.keys(current.request.headers).map(key=> {

                                    var value = current.request.headers[key];
                                    return <InfoItem key={"response-header"+key} name={key} value={value}/>
                                }) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});