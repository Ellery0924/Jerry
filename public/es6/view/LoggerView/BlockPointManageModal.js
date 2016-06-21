/**
 * Created by Ellery1 on 16/6/21.
 */
import React from 'react';

export default React.createClass({
    render(){

        return (
            <div id="blockPointManageModal" role="dialog" className="modal" aria-labelledby="openBlockPointManageModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">断点配置</h4>
                        </div>
                        <div className="modal-body">
                            <p>One fine body&hellip;</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
