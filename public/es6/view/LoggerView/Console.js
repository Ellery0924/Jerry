/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import ListView from '../Common/ListView';

export default React.createClass({
    _renderRow(item){

        const {method, url, time}=item;

        return (
            <div className="log-item">
                <span className="log-item-method">{method}</span>
                <span className="log-item-url">{url}</span>
            </div>
        );
    },
    render(){

        const {logList}=this.props;

        return (
            <div className="panel panel-default console">
                <div className="panel-heading">
                    <h3 className="panel-title">日志</h3>
                </div>
                <div className="panel-body">
                    <ListView
                        dataSrc={logList}
                        itemHeight={50}
                        containerHeight={200}
                        rangeSize={10}
                        renderRow={this._renderRow}
                    />
                </div>
            </div>
        );
    }
});