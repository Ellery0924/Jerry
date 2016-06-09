/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';

export default React.createClass({
    render(){

        const {current}=this.props;

        return (
            <div className="log-overview">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                                   aria-expanded="true" aria-controls="collapseOne">
                                    General
                                </a>
                            </h4>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="headingOne">
                            <div className="panel-body">
                                {JSON.stringify(current)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group" id="response" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="response-accordion-control">
                            <h4 className="panel-title">
                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#response"
                                   href="#response-accordion-content" aria-expanded="true"
                                   aria-controls="collapseThree">
                                    Response
                                </a>
                            </h4>
                        </div>
                        <div id="response-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="response-accordion-content">
                            <div className="panel-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                                squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
                                craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth
                                nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-group" id="request" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="response-accordion-control">
                            <h4 className="panel-title">
                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#request"
                                   href="#request-accordion-content" aria-expanded="true" aria-controls="collapseThree">
                                    Request
                                </a>
                            </h4>
                        </div>
                        <div id="request-accordion-content" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="request-accordion-content">
                            <div className="panel-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                                squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
                                craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                                butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth
                                nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});