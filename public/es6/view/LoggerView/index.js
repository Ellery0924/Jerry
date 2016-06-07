/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Filter from './Filter';
import Console from './Console';

export default React.createClass({
    render(){

        return (
            <div className="logger-view">
                <div className="logger-left">
                    <Filter/>
                    <Console/>
                </div>
                <div className="logger-right">22222</div>
            </div>
        );
    }
});