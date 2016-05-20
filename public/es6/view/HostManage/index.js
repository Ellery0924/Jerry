/**
 * Created by Ellery1 on 16/1/1.
 */
import React from 'react';
import GroupNavigator from './GroupNavigator/index';
import RuleTable from './RuleTable/index';

export default React.createClass({
    render(){

        return (
            <div className="row">
                <GroupNavigator {...this.props}/>
                <RuleTable {...this.props}/>
            </div>
        );
    }
});