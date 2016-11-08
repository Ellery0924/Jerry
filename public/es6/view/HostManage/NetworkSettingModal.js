/**
 * Created by Ellery1 on 16/8/2.
 */
import React from 'react';

export default React.createClass({
    render(){
        const {httpsOn, onSwitchHttps, onSelectThrottleLevel}=this.props;
        const httpsOnTxt = httpsOn ? '开启' : '关闭';
        const throttleLevel = this.props.throttleLevel ? this.props.throttleLevel : 'No throttling';

        return (
            <div className="modal network-setting-modal" id="networkSettingModal">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">网络配置</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="newRule_domain">HTTPS代理:</label>
                                <div className="btn-group https-switch">
                                    <button type="button" className="btn btn-default dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        {httpsOnTxt} <span className="caret"/>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a onClick={()=>onSwitchHttps(true)} href="javascript:void 0;">开启</a></li>
                                        <li><a onClick={()=>onSwitchHttps(false)} href="javascript:void 0">关闭</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newRule_domain">网速控制:</label>
                                <div className="btn-group throttling-select">
                                    <button type="button" className="btn btn-default dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        {throttleLevel} <span className="caret"/>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a onClick={()=>onSelectThrottleLevel(null)} href="javascript:void 0;">
                                                No throttling
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={()=>onSelectThrottleLevel("4G")} href="javascript:void 0">4G</a>
                                        </li>
                                        <li>
                                            <a onClick={()=>onSelectThrottleLevel("3G")} href="javascript:void 0">3G</a>
                                        </li>
                                        <li>
                                            <a onClick={()=>onSelectThrottleLevel("2G")} href="javascript:void 0">2G</a>
                                        </li>
                                        <li>
                                            <a onClick={()=>onSelectThrottleLevel("GPRS")} href="javascript:void 0">
                                                GPRS
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                            >
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});