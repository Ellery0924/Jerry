/**
 * Created by Ellery1 on 16/1/11.
 */
import React from 'react';
import Navigator from '../Common/Navigator';
import { connect } from 'react-redux';
import { setServerAndSave } from '../../dataLayer/qproxy/action';
import { validateServerConfig } from '../../utils';

const ServerManageView = React.createClass({
    componentDidUpdate(){
        $(this.refs.serverInfoInput).val(JSON.stringify(this.props.server, null, '\t'))
    },
    onSubmit(){
        const { dispatch }=this.props;

        var serverInfo = this.refs.serverInfoInput.value,
            validateResult = validateServerConfig(serverInfo);

        if (validateResult.result) {
            dispatch(setServerAndSave(JSON.parse(this.refs.serverInfoInput.value)))
                .then(() => alert('保存成功,请重启qproxy.'));
        } else {
            alert(validateResult.message);
        }
    },
    render(){
        return (
            <div className="container-fluid serverView">
                <Navigator/>
                <div className="container-fluid serverView">
                    <div className="page-header">
                        <h1>服务器组配置(~/.qsconfig):</h1>
                    </div>
                    <textarea ref="serverInfoInput" className="form-control serverInfo_input">
                    </textarea>
                    <button
                        type="submit"
                        className="save form-control btn btn-success"
                        onClick={this.onSubmit}
                    >
                        保存
                    </button>
                </div>
            </div>
        );
    }
});

function select(state) {
    return state.qproxy.toJS();
}

export default connect(select)(ServerManageView);