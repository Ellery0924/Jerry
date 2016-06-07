/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Filter from './Filter';
import Console from './Console';
import Detail from './Detail';

export default React.createClass({
    render(){

        return (
            <div className="logger-view">
                <div className="logger-left">
                    <Filter/>
                    <Console/>
                </div>
                <div className="logger-right">
                    <Detail/>
                </div>
            </div>
        );
    }
});