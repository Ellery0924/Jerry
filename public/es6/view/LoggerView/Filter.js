/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';

export default React.createClass({
    render(){

        return (
            <div className="filter">
                <div className="filter-input">
                    <div className="input-group">
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                Action <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="javascript:void 0;">不限</a></li>
                                <li><a href="javascript:void 0;">GET</a></li>
                                <li><a href="javascript:void 0">POST</a></li>
                            </ul>
                        </div>
                        <input type="text" placeholder="输入正则表达式或者字符串" className="form-control"/>
                    </div>
                </div>
                <button type="button" className="btn btn-primary filter-btn">过滤</button>
                <button type="button" className="btn btn-danger reset-btn">重置</button>
            </div>
        );
    }
});