/**
 * Created by Ellery1 on 16/6/21.
 */
import React from 'react';

export default React.createClass({
    componentDidMount(){
        $(this.refs.modal).on('shown.bs.modal', ()=> {
            $(this.refs.blockPointInsertInput).focus().val('');
        });
    },
    _onInsertBtnClick(){
        var regex = this.refs.blockPointInsertInput.value;

        if (regex) {
            this.props.insertBlockPointAndSave(regex);
            this.refs.blockPointInsertInput.value = "";
        } else {
            alert("请输入断点URL!");
        }
    },
    _onRemoveBtnClick(evt){
        var target = evt.target,
            index = target.dataset.blockpointindex;

        this.props.removeBlockPointAndSave(index);
    },
    _onSwitchIsOn(evt){
        var target = evt.target,
            index = target.dataset.blockpointindex,
            isOn = target.value === "true";

        this.props.switchBlockPointAndSave(index, isOn);
    },
    _onSelectCheckBoxChange(evt){
        var target = evt.target,
            index = target.dataset.blockpointindex,
            selected = target.checked;

        selected ?
            this.props.selectBlockPoint(index) :
            this.props.deselectBlockPoint(index);
    },
    _onSelectAllChange(evt){
        var target = evt.target,
            selected = target.checked;

        selected ?
            this.props.selectAllBlockPoint() :
            this.props.deselectAllBlockPoint();
    },
    _onRemoveSelectedBlockPoint(){
        this.props.removeSelectedBlockPointAndSave();
    },
    render(){
        const blockPointList = this.props.blockPointList.toJS();
        const isBlockPointListEmpty = !blockPointList.length;
        const allSelected = !isBlockPointListEmpty && blockPointList.every(setting=>setting.selected);
        const multiDelEnable = blockPointList.some(setting=>setting.selected);

        return (
            <div ref="modal" id="blockPointManageModal" role="dialog" className="modal"
                 aria-labelledby="openBlockPointManageModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">断点配置</h4>
                        </div>
                        <div className="modal-body">
                            <div className="block-point-insert-input">
                                <input
                                    ref="blockPointInsertInput"
                                    className="form-control"
                                    type="text"
                                    placeholder="请输入URL或URL片段"
                                />
                                <button
                                    onClick={this._onInsertBtnClick}
                                    className="btn btn-primary insert-btn"
                                >
                                    添加
                                </button>
                                <button
                                    onClick={this._onRemoveSelectedBlockPoint}
                                    disabled={!multiDelEnable}
                                    className="btn btn-danger multi-del-btn"
                                >
                                    批量删除
                                </button>
                            </div>
                            <table className="block-point-setting table-hover table table-striped">
                                <tbody>
                                <tr>
                                    <th className="block-point-setting-regex">表达式</th>
                                    <th className="block-point-setting-is-on">是否开启</th>
                                    <th className="block-point-setting-del-btn">删除</th>
                                    <th className="block-point-setting-select-all">
                                        <input
                                            onChange={this._onSelectAllChange}
                                            checked={allSelected}
                                            disabled={isBlockPointListEmpty}
                                            type="checkbox"
                                            ref="selectAllCheckBox"
                                        />
                                    </th>
                                </tr>
                                {blockPointList.map((setting, i)=> {

                                    return (
                                        <tr className="block-point-list-item" key={"block-point-list-item-"+setting.id}>
                                            <td className="block-point-list-regex">
                                                {setting.regex}
                                            </td>
                                            <td>
                                                <select
                                                    data-blockpointindex={i}
                                                    onChange={this._onSwitchIsOn}
                                                    className="block-point-is-on-select form-control"
                                                    value={setting.isOn}
                                                >
                                                    <option value={true}>是</option>
                                                    <option value={false}>否</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={this._onRemoveBtnClick}
                                                    data-blockpointindex={i}
                                                    type="button"
                                                    className="btn-danger btn block-point-del-btn"
                                                >
                                                    删除
                                                </button>
                                            </td>
                                            <td>
                                                <input
                                                    data-blockpointindex={i}
                                                    onChange={this._onSelectCheckBoxChange}
                                                    type="checkbox"
                                                    className="block-point-select"
                                                    checked={setting.selected}
                                                />
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
