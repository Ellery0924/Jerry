/**
 * Created by Ellery1 on 16/1/2.
 */
import React from 'react';

export default React.createClass({
    render(){
        const {server,current,onEnvChange,groupName,ruleIndex}=this.props;

        return (
            <select
                value={current}
                onChange={(evt)=>{onEnvChange(groupName,ruleIndex,evt.target.value)}}
                className="env_select form-control"
            >
                {Object.keys(server).map((env)=>
                    <option
                        key={env}
                        value={env}
                    >
                        {env}
                    </option>
                )}
            </select>
        );
    }
});