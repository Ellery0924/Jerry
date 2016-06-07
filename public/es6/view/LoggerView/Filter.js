/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';

export default React.createClass({
    render(){

        return (
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
                <input type="text" className="form-control"/>
            </div>
        );
    }
});