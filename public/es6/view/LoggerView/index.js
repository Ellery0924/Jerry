/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import Filter from './Filter';
import Console from './Console';
import Detail from './Detail';
import BlockPointManageModal from './BlockPointManageModal';

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
            blockPointContinue,
            blockPointAbort,
            allBlockPointContinue,
            allBlockPointAbort,
            blockPointList,
            insertBlockPointAndSave,
            removeBlockPointAndSave,
            switchBlockPointAndSave,
            modifyBlockPointRegexAndSave,
            selectBlockPoint,
            deselectBlockPoint,
            selectAllBlockPoint,
            deselectAllBlockPoint,
            removeSelectedBlockPointAndSave
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
                        allBlockPointContinue={allBlockPointContinue}
                        allBlockPointAbort={allBlockPointAbort}
                    />
                </div>
                <Detail
                    current={current}
                    blockPointList={blockPointList}
                    closeDetail={closeDetail}
                    isBlocked={isBlocked}
                    insertBlockPointAndSave={insertBlockPointAndSave}
                    blockPointContinue={blockPointContinue}
                    blockPointAbort={blockPointAbort}
                />
                <BlockPointManageModal
                    blockPointList={blockPointList}
                    insertBlockPointAndSave={insertBlockPointAndSave}
                    removeBlockPointAndSave={removeBlockPointAndSave}
                    switchBlockPointAndSave={switchBlockPointAndSave}
                    modifyBlockPointRegexAndSave={modifyBlockPointRegexAndSave}
                    selectBlockPoint={selectBlockPoint}
                    deselectBlockPoint={deselectBlockPoint}
                    selectAllBlockPoint={selectAllBlockPoint}
                    deselectAllBlockPoint={deselectAllBlockPoint}
                    removeSelectedBlockPointAndSave={removeSelectedBlockPointAndSave}
                />
            </div>
        );
    }
});