/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import BodyContainer from './BodyContainer';

export default React.createClass({
    render(){

        const {responseData}=this.props;

        return (
            <div className="log-response">
                <div className="panel-group" role="tablist" aria-multiselectable="true" id="response-body-panel">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#response-body-panel"
                                   href="#response-body-accordion-content" id="request-body-accordion-control"
                                   aria-expanded="false" aria-controls="response-body-accordion-content">
                                    JSON Body
                                </a>
                            </h4>
                        </div>
                        <div id="response-body-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="response-body-accordion-control">
                            <BodyContainer body={responseData.body}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});