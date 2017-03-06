/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import ListView from '../Common/ListView';
import { MAX_LOG_NUM } from '../../dataLayer/log/log';

var LogItem = React.createClass({
    shouldComponentUpdate(){
        return false;
    },
    _getStatusColor(statusCode){
        switch (statusCode.toString()[0]) {
        case "2":
            return "success";
        case "3":
            return "redirect";
        case "4":
            return "client-error";
        case "5":
            return "server-error";
        default:
            return "others";
        }
    },
    render(){
        const { type, method, url, statusCode }=this.props.item;

        return (
            <a href="javascript:void 0;" className="log-item" title={url}>
                {type === 'blockpoint' ? <span className="log-item-blockpoint">BLOCKPOINT</span> : null}
                <span className={"log-item-method " + (method === 'GET' ? 'get' : 'post')}>{method}</span>
                <span className={"log-item-status " + this._getStatusColor(statusCode)}>{statusCode}</span>
                <span className="log-item-url">{url}</span>
            </a>
        );
    }
});

export default React.createClass({
    shouldComponentUpdate(nextProp){
        if (window.qproxy.shouldRefreshConsole) {
            window.qproxy.shouldRefreshConsole = false;
            return true;
        }
        return nextProp.logList !== this.props.logList;
    },
    componentWillUnmount(){
        //在退出日志页面时设置一个全局变量,再次进入时刷新console
        window.qproxy.shouldRefreshConsole = true;
    },
    _renderRow(item){
        return (
            <LogItem item={item}/>
        );
    },
    _clearConsole(){
        this.props.clear();
    },
    _onItemLayout(item, domNode){
        if (item.index === this.props.current.index) {
            $(domNode).addClass('active');
        }
    },
    _onItemClick(item, evt){
        this.props.checkDetail(item);
        $('.js-overview-tablink').find('a').trigger('click');
        $('.listview-item-wrap').removeClass('active');
        $(evt.currentTarget).addClass('active');
    },
    render(){
        const logList = this.props.logList.toJS();
        const { isBlocked, allBlockPointContinue, allBlockPointAbort } = this.props;
        const vh = $(window).height();

        return (
            <div className="panel panel-default console">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {`日志(最多保留${MAX_LOG_NUM}条,单击查看详情)`}
                        <button
                            disabled={isBlocked}
                            onClick={this._clearConsole}
                            type="button"
                            className="btn btn-default glyphicon glyphicon-ban-circle clear-console"
                        />
                        {isBlocked ?
                            <button
                                onClick={allBlockPointContinue}
                                className="btn btn-default all-continue"
                            >
                                All Continue
                            </button> : null
                        }
                        {isBlocked ?
                            <button
                                onClick={allBlockPointAbort}
                                className="btn btn-default all-abort"
                            >
                                All Abort
                            </button> : null
                        }
                    </h3>
                </div>
                <div className="panel-body">
                    <ListView
                        name="console"
                        dataSrc={logList}
                        itemHeight={30}
                        containerHeight={0.75 * vh - 68}
                        rangeSize={20}
                        renderRow={this._renderRow}
                        onItemClick={this._onItemClick}
                        onItemLayout={this._onItemLayout}
                    />
                </div>
            </div>
        );
    }
});