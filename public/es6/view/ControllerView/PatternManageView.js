/**
 * Created by Ellery1 on 16/1/11.
 */
import React from 'react';
import { connect } from 'react-redux';
import Navigator from '../Common/Navigator';
import RewriteManage from '../RewriteManage/index';
import { setPatternAndSave, insertPatternAndSave, deletePatternAndSave } from '../../dataLayer/qproxy/action';

const RewriteManageView = React.createClass({
    render(){
        const { dispatch }=this.props;
        const { rewrite }=this.props.config;

        return (
            <div>
                <Navigator/>
                <RewriteManage
                    patternList={rewrite}
                    onSetPattern={(index, pattern) => dispatch(setPatternAndSave(index, pattern))}
                    onInsertPattern={(pattern) => dispatch(insertPatternAndSave(pattern))}
                    onDeletePattern={(index) => dispatch(deletePatternAndSave(index))}
                />
            </div>
        );
    }
});

function select(state) {
    return state.qproxy.toJS();
}

export default connect(select)(RewriteManageView);