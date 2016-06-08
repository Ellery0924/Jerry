/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import ListView from '../Common/ListView';

var LogItem = React.createClass({
    shouldComponentUpdate(){

        return false;
    },
    render(){

        const {method, url}=this.props.item;

        return (
            <a href="javascript:void 0;" className="log-item" title={url}>
                <span className={"log-item-method "+(method==='GET'?'get':'post')}>{method}</span>
                <span className="log-item-url">{url}</span>
            </a>
        );
    }
});

export default React.createClass({
    _renderRow(item){

        return (
            <LogItem item={item}/>
        );
    },
    _clearConsole(){

        const {clear}=this.props;
        clear();
    },
    render(){

        const {logList, shouldResetY}=this.props;
        const vh = $(window).height();

        return (
            <div className="panel panel-default console">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        日志
                        <button onClick={this._clearConsole} type="button" className="glyphicon glyphicon-ban-circle clear-console">清空</button>
                    </h3>
                </div>
                <div className="panel-body">
                    <ListView
                        dataSrc={logList}
                        itemHeight={30}
                        containerHeight={0.75 * vh-68}
                        rangeSize={20}
                        shouldResetY={!!shouldResetY}
                        renderRow={this._renderRow}
                    />
                </div>
            </div>
        );
    }
});