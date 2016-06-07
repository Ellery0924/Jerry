/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Filter from './Filter';
import Console from './Console';
import Detail from './Detail';

export default React.createClass({
    render(){

        const {list}=this.props;
        return (
            <div className="logger-view">
                <div className="logger-left">
                    <Filter/>
                    <Console logList={list}/>
                </div>
                <div className="logger-right">
                    <Detail/>
                </div>
            </div>
        );
    }
});