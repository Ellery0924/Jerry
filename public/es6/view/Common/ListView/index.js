/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import DataSource from './dataSource';

var ds = new DataSource({visibleRange: 10});

export default React.createClass({
    getInitialState(){

        return {
            visibleItemList: [],
            contentHeight: 0
        };
    },
    _onScrollGenerator(){

        var currentScrollTop = 0,
            self = this;

        return function (evt) {

            var container = evt.target,
                nextScrollTop = container.scrollTop,
                deltaTop = nextScrollTop - currentScrollTop;

            if (deltaTop < 0) {

                self.autoScroll = false;
            }
            if (nextScrollTop >= ds.getMaxScrollTop() - self.props.itemHeight) {

                self.autoScroll = true;
            }

            ds.configureVisibleRange(nextScrollTop);
            self.setState({
                visibleItemList: ds.getVisibleItems(),
                contentHeight: ds.getContentHeight()
            });
            currentScrollTop = nextScrollTop;
        };
    },
    componentWillReceiveProps(props){

        const {dataSrc}=props;

        if (dataSrc) {

            const {containerHeight, itemHeight, rangeSize}=props;

            ds.refresh({
                dataSrc,
                itemHeight,
                containerHeight,
                rangeSize
            });

            this.state.visibleItemList = ds.getVisibleItems();
            this.state.contentHeight = ds.getContentHeight();
        }
    },
    componentDidUpdate(){

        var container = this.refs.container;

        if (this.autoScroll) {

            $(container).scrollTop(ds.getMaxScrollTop());
        }
    },
    componentWillMount(){

        this.autoScroll = true;
        this._onScroll = this._onScrollGenerator();
        ds.setVisibleRage(0, 10);
    },
    render(){

        const {renderRow, containerHeight, itemHeight}=this.props;
        const visibleItemList = this.state.visibleItemList;
        const contentHeight = this.state.contentHeight;

        var onItemClick = this.props.onItemClick || function () {
            };

        if (visibleItemList) {

            return (
                <div onScroll={this._onScroll} className="js-listview-container" ref="container" style={{
                    position:'relative',
                    height:containerHeight+'px',
                    "overflowY":'auto',
                    "overflowX":"hidden"
                }} className="listview-container">
                    <ul ref="content" style={{
                        height:contentHeight+"px",
                        marginBottom:0
                    }}>
                        {visibleItemList.map((item, i)=>(
                            <li
                                className="listview-item-wrap"
                                onClick={(evt)=>{onItemClick(item,i,evt)}}
                                style={{
                                    position:"absolute",
                                    height:itemHeight+"px",
                                    top:item.top+"px",
                                    left:0,
                                    right:0
                                }}
                                key={item.index}>
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