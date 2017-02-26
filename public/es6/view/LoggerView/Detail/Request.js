/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import InfoItem from './commonComponent/InfoItem';
import InfoPanel from './commonComponent/InfoPanel';
import BodyContainer from './commonComponent/BodyContainer';

export default React.createClass({
    render(){
        const { requestData, keyTail } = this.props;

        return (
            <div className="log-request">
                <InfoPanel id="log-request-query-string" title="Query String Parameters">
                    {!$.isEmptyObject(requestData.query) ? Object.keys(requestData.query).map(key =>
                            <InfoItem key={"query-string-parameter-" + key + keyTail} name={key}
                                      value={requestData.query[key]}/>) : "无"}
                </InfoPanel>
                <InfoPanel id="log-request-body" title="Request Body">
                    <BodyContainer body={requestData.body}/>
                </InfoPanel>
                <InfoPanel id="log-request-raw-body" isCollapsed={true} title="Raw Body">
                    {requestData.raw ? requestData.raw : "无"}
                </InfoPanel>
            </div>
        );
    }
});