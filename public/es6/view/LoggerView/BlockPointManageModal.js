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

        const blockPointList = this.props.blockPointList.toJS();

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
                                       placeholder="请输入URL"/>
                                <button className="btn btn-primary insert-btn">添加</button>
                            </div>
                            <table className="block-point-setting table-hover table table-striped">
                                <tbody>
                                <tr>
                                    <th className="block-point-setting-select-all">
                                        <input type="checkbox" ref="selectAllCheckBox"/>
                                    </th>
                                    <th className="block-point-setting-regex">表达式</th>
                                    <th className="block-point-setting-is-on">是否开启</th>
                                    <th className="block-point-setting-del-btn">删除</th>
                                </tr>
                                {blockPointList.map((setting, i)=> {

                                    return (
                                        <tr key={"block-point-list-item-"+i}>
                                            <td>
                                                <input type="checkbox" className="block-point-select"
                                                       checked={setting.selected}/>
                                            </td>
                                            <td>
                                                <input type="text" className="block-point-regex-input form-control"
                                                       value={setting.regex}/>
                                            </td>
                                            <td>
                                                <select className="block-point-is-on-select form-control"
                                                        value={setting.isOn}>
                                                    <option value={true}>是</option>
                                                    <option value={false}>否</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" className="btn-danger btn block-point-del-btn">
                                                    删除
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
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
