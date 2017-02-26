/**
 * Created by Ellery1 on 16/1/11.
 */
import React from 'react';
import Pattern from './Pattern';
import InsertModal from './InsertModal';

export default React.createClass({
    render(){
        const { patternList, onSetPattern, onDeletePattern, onInsertPattern } = this.props;

        return (
            <div className="rewriteSetting container-fluid">
                <div className="page-header">
                    <h1>URL MAP配置</h1>
                    <button className="btn btn-success openAddModal" data-toggle="modal" data-target="#addPatternModal">
                        新增规则
                    </button>
                </div>
                <table className="table table-striped table-hover">
                    <tbody className="pattern_setting">
                    <tr>
                        <th>Pattern</th>
                        <th>Responder</th>
                        <th className="action">操作</th>
                    </tr>
                    {patternList.map((pattern, index) =>
                        <Pattern
                            key={index}
                            index={index}
                            onSetPattern={onSetPattern}
                            onDeletePattern={onDeletePattern}
                            {...pattern}
                        />
                    )}
                    </tbody>
                </table>
                <InsertModal patternList={patternList} onInsertPattern={onInsertPattern}/>
            </div>
        );
    }
});