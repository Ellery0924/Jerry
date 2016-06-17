/**
 * Created by Ellery1 on 16/6/10.
 */
import React from 'react';

export default React.createClass({
    render(){

        const {name, value}=this.props;

        return value ? (
            <div className="form-group">
                <label className="control-label name">{name.toUpperCase()}:</label>
                <span className="value">{value}</span>
            </div>
        ) : null;
    }
});