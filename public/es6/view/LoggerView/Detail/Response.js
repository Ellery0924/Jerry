/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import InfoPanel from './commonComponent/InfoPanel';
import BodyContainer from './commonComponent/BodyContainer';

export default React.createClass({
    render(){
        const { responseData, isBlocked } = this.props;

        return (
            <div className="log-response">
                <InfoPanel id="log-response-body" title={isBlocked ? "Body" : "JSON Body"}>
                    <BodyContainer
                        editable={isBlocked}
                        isBlocked={isBlocked}
                        jsonp={responseData.jsonp}
                        body={responseData.body}
                        raw={responseData.raw}
                    />
                </InfoPanel>
                {isBlocked ? null :
                    <InfoPanel id="log-response-raw" isCollapsed={true} title="Raw Body">
                        {responseData.raw ? responseData.raw : "无"}
                    </InfoPanel>}
            </div>
        );
    }
});