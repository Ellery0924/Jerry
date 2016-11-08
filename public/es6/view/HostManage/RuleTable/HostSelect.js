/**
 * Created by Ellery1 on 16/1/2.
 */
import React from 'react';

export default React.createClass({
    render(){
        const {
                current,
                server,
                cache,
                onHostChange,
                groupName,
                ruleIndex}=this.props,
            hostList = server[current];

        return (
            current === 'custom' ?
                <input
                    type="text"
                    className="ip_input form-control"
                    onChange={(evt)=>{
                            onHostChange(groupName,ruleIndex,current,evt.target.value)
                        }}
                    value={cache}
                /> :
                current === 'online' ?
                    null :
                    <select
                        value={cache}
                        onChange={(evt)=>{
                            onHostChange(groupName,ruleIndex,current,evt.target.value)
                        }}
                        className="host_select form-control"
                    >
                        {Object.keys(hostList).map((hostIndex)=>
                            <option
                                key={hostIndex}
                                value={hostIndex}
                            >
                                {hostList[hostIndex]}
                            </option>
                        )}
                    </select>
        )
    }
});