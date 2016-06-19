/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Overview from './Overview';
import Request from './Request';
import Response from './Response';
import {fixTextarea} from './util';

export default React.createClass({
    componentDidMount(){

        $(document.body).on('click', ".js-body-tablink", ()=> {

            $('.body-textarea').each((i, ta)=> {
                $(ta).css('height', 'auto');
            });
            fixTextarea();
            $('#response-raw-accordion-content').removeClass('in');
        });
    },
    render(){

        const {current, closeDetail, isBlocked}=this.props;

        return !$.isEmptyObject(current) ? (
            <div className="logger-right">
                <div className="logger-right-content">
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="js-overview-tablink log-detail-first-tab active">
                            <a href="#overview-panel" aria-controls="overview-panel" role="tab"
                               data-toggle="tab">
                                Overview
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#response-panel" className="js-body-tablink" id="response-tablink"
                               aria-controls="response-panel" role="tab"
                               data-toggle="tab">
                                Response
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#request-panel" className="js-body-tablink" id="request-tablink"
                               aria-controls="request-panel" role="tab"
                               data-toggle="tab">
                                Request
                            </a>
                        </li>
                        <button
                            onClick={()=>{closeDetail()}}
                            type="button"
                            className="btn btn-default glyphicon glyphicon-remove clear-detail"
                        />
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane overview-panel active" id="overview-panel">
                            <Overview current={current}/>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="response-panel">
                            <Response isBlocked={isBlocked} responseData={current.response}/>
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
