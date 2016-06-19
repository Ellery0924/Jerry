/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Filter from './Filter';
import Console from './Console';
import Detail from './Detail';

export default React.createClass({
    render(){

        const {
            filtered,
            isBlocked,
            filterCondition,
            filter,
            clear,
            checkDetail,
            closeDetail,
            current,
            blockPointContinue
        }=this.props;

        return (
            <div className="logger-view">
                <div className="logger-left">
                    <Filter
                        isBlocked={isBlocked}
                        condition={filterCondition}
                        filter={filter}
                    />
                    <Console
                        isBlocked={isBlocked}
                        current={current}
                        logList={filtered}
                        clear={clear}
                        checkDetail={checkDetail}
                    />
                </div>
                <Detail
                    current={current}
                    closeDetail={closeDetail}
                    isBlocked={isBlocked}
                    blockPointContinue={blockPointContinue}
                />
            </div>
        );
    }
});