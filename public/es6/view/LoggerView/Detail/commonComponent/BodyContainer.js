/**
 * Created by Ellery1 on 16/6/10.
 */
import React from 'react';
import {isObject} from '../../../../utils';

export default React.createClass({
    componentWillUpdate(){

        const {body}=this.props;
        var isValidJSON = isObject(body) || Array.isArray(body),
            value = isValidJSON ? JSON.stringify(body, null, 4) : body;

        if (this.textarea) {

            $(this.textarea).val(value);
        }
    },
    render(){

        const {body, editable}=this.props;

        var isValidJSON = isObject(body) || Array.isArray(body);

        return (
            body ?
                <textarea
                    ref={component=>this.textarea=component}
                    resize={false}
                    disabled={!editable}
                    className="body-textarea">
                </textarea> :
                <span>无</span>
        )
    }
});