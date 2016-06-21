/**
 * Created by Ellery1 on 16/6/21.
 */
import React from 'react';

export default React.createClass({
    componentDidMount(){

        $(this.refs.modal).on('shown.bs.modal', ()=> {

            $(this.refs.blockPointInsertInput).focus();
        });
    },
    render(){

        return (
            <div ref="modal" id="blockPointManageModal" role="dialog" className="modal"
                 aria-labelledby="openBlockPointManageModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">断点配置</h4>
                        </div>
                        <div className="modal-body">
                            <div className="block-point-insert-input">
                                <input ref="blockPointInsertInput" className="form-control" type="text"
                                       placeholder="请输入正则表达式(请使用\.和\?代替.和?,其他元字符以此类推"/>
                                <button className="btn btn-primary insert-btn">添加</button>
                            </div>
                            <table class="table table-striped">

                            </table>
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
