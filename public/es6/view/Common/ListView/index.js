/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import DataSource from './dataSource';

export default React.createClass({
    render(){

        var {dataSrc}=this.props;

        if (dataSrc) {

            var {containerHeight, renderRow, itemHeight, rangeSize}=this.props,
                ds = new DataSource({
                    dataSrc,
                    itemHeight,
                    containerHeight,
                    rangeSize
                }),
                visibleItemList = ds.getVisibleItems(),
                contentHeight = ds.getContentHeight();

            return (
                <div style={{
                    position:'relative',
                    height:containerHeight+'px',
                    overflow:'auto'
                }} className="listview-container">
                    <ul style={{
                        height:contentHeight+"px"
                    }}>
                        {visibleItemList.map((item, i)=>(
                            <li className="listview-item-wrap" style={{
                                position:"absolute",
                                height:itemHeight+"px",
                                top:item.top+"px",
                                left:0,
                                right:0
                            }} key={item.index}>
                                {renderRow(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return null;
    }
});