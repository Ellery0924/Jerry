/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import InfoPanel from './commonComponent/InfoPanel';
import BodyContainer from './commonComponent/BodyContainer';

export default React.createClass({
    render(){

        const {responseData}=this.props;

        return (
            <div className="log-response">
                <InfoPanel id="log-response-body" title="JSON Body">
                    <BodyContainer body={responseData.body}/>
                </InfoPanel>
                <InfoPanel id="log-response-raw" title="Raw Body">
                    {responseData.raw ? responseData.raw : "无"}
                </InfoPanel>
            </div>
        );
    }
});