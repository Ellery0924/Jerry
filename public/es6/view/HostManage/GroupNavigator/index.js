/**
 * Created by Ellery1 on 16/1/1.
 */
import React from 'react';

export default React.createClass({
    _getJSX(){

        const {group, activated, onSelectGroup}=this.props;

        if (group !== undefined) {

            return Object.keys(group).map((groupName)=>
                <li
                    key={groupName}
                    onClick={()=>{onSelectGroup(groupName)}}
                    className={activated===groupName?'active':''}
                >
                    <a href="javascript:void 0;">{groupName}</a>
                </li>
            );
        }
        return [];
    },
    componentDidMount(){

        $('.dropdown-toggle').dropdown();
    },
    render(){

        const {onSwitchHttps, httpsOn}=this.props;
        const httpsOnTxt = httpsOn === undefined ? '' : httpsOn ? '开启' : '关闭';

        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <div className="btn-group https-switch">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Https代理:{httpsOnTxt} <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a onClick={()=>onSwitchHttps(true)} href="javascript:void 0;">开启</a></li>
                        <li><a onClick={()=>onSwitchHttps(false)} href="javascript:void 0">关闭</a></li>
                    </ul>
                </div>
                <ul className="nav nav-sidebar group_nav" id="group_nav">
                    {this._getJSX()}
                </ul>
            </div>
        )
    }
});