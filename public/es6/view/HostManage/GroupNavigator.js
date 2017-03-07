/**
 * Created by Ellery1 on 16/1/1.
 */
import React from 'react';

export default React.createClass({
    _getJSX(){
        const { group, activated, onSelectGroup }=this.props;

        if (group !== undefined) {
            return Object.keys(group)
                .sort((a, b) => a === 'default' ? -1 : 1)
                .map((groupName) =>
                    <li
                        key={groupName}
                        onClick={() => {
                            onSelectGroup(groupName)
                        }}
                        className={activated === groupName ? 'active' : ''}
                    >
                        <a title={groupName} href="javascript:void 0;">{groupName}</a>
                    </li>
                );
        }
        return [];
    },
    componentDidMount(){
        $('.dropdown-toggle').dropdown();
    },
    render(){
        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <button
                    className="btn btn-default network-setting-open"
                    data-target="#networkSettingModal"
                    data-toggle="modal"
                >
                    网络配置
                </button>
                <ul className="nav nav-sidebar group_nav" id="group_nav">
                    {this._getJSX()}
                </ul>
            </div>
        )
    }
});