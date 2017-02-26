/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';
import DataSource from './dataSource';

var ds = new DataSource({ visibleRange: 10 });

const noop = function () {
};

const ListItem = React.createClass({
    componentDidMount(){
        const { item, onItemLayout }=this.props;
        onItemLayout(item, this.domNode);
    },
    render(){
        const { item, itemHeight, onItemClick, renderRow } = this.props;
        return (
            <li
                ref={component => {
                    this.domNode = component
                }}
                className="listview-item-wrap"
                onClick={(evt) => {
                    onItemClick(item, evt)
                }}
                itemIndex={item.index}
                style={{
                    position: "absolute",
                    height: itemHeight + "px",
                    top: item.top + "px",
                    left: 0,
                    minWidth: "100%"
                }}
                key={item.index}>
                {renderRow(item)}
            </li>
        );
    }
});

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
        const { dataSrc }=props;

        if (dataSrc) {
            const { containerHeight, itemHeight, rangeSize }=props;

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
        const { renderRow, containerHeight, itemHeight, name }=this.props;
        const visibleItemList = this.state.visibleItemList;
        const contentHeight = this.state.contentHeight;
        const onItemClick = this.props.onItemClick || noop;
        const onItemLayout = this.props.onItemLayout || noop;

        if (visibleItemList) {

            return (
                <div onScroll={this._onScroll} className="listview-container" ref="container"
                     style={{
                         position: 'relative',
                         height: containerHeight + 'px'
                     }}>
                    <ul ref="content" style={{
                        height: contentHeight + "px",
                        marginBottom: 0
                    }}>
                        {visibleItemList.map((item, i) => (
                            <ListItem
                                item={item}
                                itemHeight={itemHeight}
                                onItemClick={onItemClick}
                                onItemLayout={onItemLayout}
                                renderRow={renderRow}
                                key={name + '-list-item-' + item.index}
                            />
                        ))}
                    </ul>
                </div>
            );
        }

        return null;
    }
});