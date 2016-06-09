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
    _onItemLayout(item, domNode){

        if (item.index === this.props.current.index) {

            $(domNode).addClass('active');
        }
    },
    _onItemClick(item, evt){

        this.props.checkDetail(item);
        $('.listview-item-wrap').removeClass('active');
        $(evt.currentTarget).addClass('active');
    },
    render(){

        const {logList}=this.props;
        const vh = $(window).height();

        return (
            <div className="panel panel-default console">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        日志
                        <button onClick={this._clearConsole} type="button"
                                className="btn btn-default glyphicon glyphicon-ban-circle clear-console"/>
                    </h3>
                </div>
                <div className="panel-body">
                    <ListView
                        dataSrc={logList}
                        itemHeight={30}
                        containerHeight={0.75 * vh-68}
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