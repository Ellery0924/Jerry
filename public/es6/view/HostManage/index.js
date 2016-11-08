/**
 * Created by Ellery1 on 16/1/1.
 */
import React from 'react';
import GroupNavigator from './GroupNavigator';
import RuleTable from './RuleTable';
import NetworkSettingModal from './NetworkSettingModal';

export default React.createClass({
    render(){
        const {httpsOn, onSwitchHttps, onSelectThrottleLevel, throttleLevel}=this.props;
        return (
            <div className="row">
                <GroupNavigator {...this.props}/>
                <RuleTable {...this.props}/>
                <NetworkSettingModal
                    onSelectThrottleLevel={onSelectThrottleLevel}
                    throttleLevel={throttleLevel}
                    httpsOn={httpsOn}
                    onSwitchHttps={onSwitchHttps}
                />
            </div>
        );
    }
});