/**
 * Created by Ellery1 on 16/6/10.
 */
import React from 'react';
import { isObject } from '../../../../utils';

export default React.createClass({
    _setTextareaValue(){
        const { body }=this.props;
        var isValidJSON = isObject(body) || Array.isArray(body);

        if (this.textarea) {
            $(this.textarea).val(isValidJSON ? JSON.stringify(body, null, 4) : body);
        }
    },
    componentDidMount(){
        this._setTextareaValue();
    },
    componentDidUpdate(){
        this._setTextareaValue();
    },
    render(){
        const { body, editable } = this.props;

        return (
            body ?
                <textarea
                    ref={component => this.textarea = component}
                    style={{
                        resize: editable ? 'vertical' : 'none'
                    }}
                    disabled={!editable}
                    className="body-textarea">
                </textarea> :
                <span>无</span>
        )
    }
});