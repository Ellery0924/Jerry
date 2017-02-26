/**
 * Created by Ellery1 on 16/6/9.
 */
import React from 'react';
import InfoItem from './commonComponent/InfoItem';
import InfoPanel from './commonComponent/InfoPanel';
import { parseCookie } from './util';

export default React.createClass({
    render(){
        const { current } = this.props;
        const requestData = current.request;
        const cookieStr = requestData.headers.cookie || null,
            cookieList = cookieStr ? parseCookie(cookieStr) : null;

        return (
            <div className="log-overview">
                <InfoPanel id="log-overview-general" title="General">
                    <InfoItem name="method" value={current.method}/>
                    <InfoItem name="url" value={current.url}/>
                    <InfoItem name="status" value={current.statusCode}/>
                    <InfoItem name="time" value={current.time}/>
                </InfoPanel>
                <InfoPanel id="log-overview-query-string" title="Query String Parameters">
                    {!$.isEmptyObject(requestData.query) ? Object.keys(requestData.query).map(key => {

                            return <InfoItem key={"query-string-parameter-" + key + current.index} name={key}
                                             value={requestData.query[key]}/>
                        }) : "无"}
                </InfoPanel>
                <InfoPanel id="log-overview-response-header" title="Response Headers">
                    {current.response ? Object.keys(current.response.headers).map(key => {

                            var value = current.response.headers[key];
                            return <InfoItem key={"response-header-" + key + current.index} name={key} value={value}/>
                        }) : null}
                </InfoPanel>
                <InfoPanel id="log-overview-request-header" title="Request Headers">
                    {current.request ? Object.keys(current.request.headers).map(key => {

                            var value = current.request.headers[key];
                            return <InfoItem key={"request-header-" + key + current.index} name={key} value={value}/>
                        }) : null}
                </InfoPanel>
                <InfoPanel id="log-overview-cookie" title="Cookie">
                    {cookieList ? Object.keys(cookieList).map(key =>
                            <InfoItem key={"request-cookie-" + key + current.index} name={key} value={cookieList[key]}/>
                        ) : "无"}
                </InfoPanel>
            </div>
        );
    }
});