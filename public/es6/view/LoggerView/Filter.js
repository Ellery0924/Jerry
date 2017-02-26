/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';

export default React.createClass({
    _onSelectMethod(method){
        const { filter }=this.props;
        const regex = this.refs.regexInput.value;

        if (method !== this.currentMethod) {
            this.currentMethod = method;
            filter({ method, regex });
        }
    },
    _onResetFilter(){
        const { filter }=this.props;
        this.currentMethod = 'ALL';
        filter({ method: 'ALL', regex: '' });
    },
    _onRegexChange(){
        const { filter }=this.props;
        var regex = this.refs.regexInput.value;
        filter({ method: this.currentMethod, regex });
    },
    _onOpenBlockPointManageModal(){
        $('#blockPointManageModal').modal('show');
    },
    componentWillMount(){
        this.currentMethod = 'ALL';
    },
    render(){
        const { method, regex }=this.props.condition;
        const { isBlocked }=this.props;
        const methodText = method === 'ALL' ? '不限 ' : method;

        return (
            <div className="filter">
                <div className="filter-input">
                    <div className="input-group">
                        <div className="input-group-btn">
                            <button disabled={isBlocked} type="button" className="btn btn-default dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                {methodText}<span className="caret"/>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a ref="allSelect" onClick={() => this._onSelectMethod('ALL')} data-method='ALL'
                                       href="javascript:void 0;">不限</a>
                                </li>
                                <li><a ref="getSelect" onClick={() => this._onSelectMethod('GET')} data-method='GET'
                                       href="javascript:void 0;">GET</a></li>
                                <li><a ref="postSelect" onClick={() => this._onSelectMethod('POST')} data-method='POST'
                                       href="javascript:void 0">POST</a></li>
                                <li><a ref="postSelect" onClick={() => this._onSelectMethod('PUT')} data-method='POST'
                                       href="javascript:void 0">PUT</a></li>
                                <li><a ref="postSelect" onClick={() => this._onSelectMethod('DELETE')}
                                       data-method='POST'
                                       href="javascript:void 0">DELETE</a></li>
                            </ul>
                        </div>
                        <input disabled={isBlocked} onChange={this._onRegexChange} value={regex} ref="regexInput"
                               type="text"
                               placeholder="输入正则表达式(请使用\.和\?代替.和?,其他正则表达式元字符以此类推)"
                               className="form-control"/>
                    </div>
                </div>
                <button
                    type="button"
                    disabled={isBlocked}
                    onClick={this._onResetFilter}
                    className="btn btn-danger reset-btn"
                >
                    重置筛选
                </button>
                <button type="button"
                        id="openBlockPointManageModal"
                        disabled={isBlocked}
                        onClick={() => {
                            this._onOpenBlockPointManageModal()
                        }}
                        className="btn btn-primary block-btn"
                        data-toogle="modal"
                        data-target="#blockPointManageModal"
                >
                    断点配置
                </button>
            </div>
        );
    }
});