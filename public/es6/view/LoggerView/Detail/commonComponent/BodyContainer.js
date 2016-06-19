/**
 * Created by Ellery1 on 16/6/10.
 */
import React from 'react';
import {isObject} from '../../../../utils';

export default React.createClass({
    render(){

        const {body}=this.props;

        var isValidJSON = isObject(body) || Array.isArray(body);

        return (
            body ?
                <textarea
                    ref={component=>this.textarea=component}
                    resize={false}
                    disabled={true}
                    value={isValidJSON?(JSON.stringify(body,null,4)):body}
                    className="body-textarea">
                </textarea> :
                <span>无</span>
        )
    }
});