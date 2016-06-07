/**
 * Created by Ellery1 on 16/6/7.
 */
function DataSource(opt) {

    this.init(opt);
}

DataSource.prototype = {
    init(opt){

        var self = this;
        this.itemHeight = opt.itemHeight;
        this.dataSrc = opt.dataSrc.map((itemData, i)=>Object.assign({}, itemData, {top: i * self.itemHeight}));
        this.visibleRange = [0, opt.rangeSize || 10];
        this.containerHeight = opt.containerHeight;
    },
    setVisibleRage(start, end){

        this.visibleRange = [start, end];
    },
    getVisibleItems(){

        return [].slice.apply(this.dataSrc, this.visibleRange);
    },
    getContentHeight(){

        return this.dataSrc.length * this.itemHeight;
    },
    configureVisibleRange(offsetY){

        var startY = offsetY - this.containerHeight,
            endY = offsetY + this.containerHeight,
            startIndex = startY / this.itemHeight,
            endIndex = endY / this.itemHeight;

        startIndex = startIndex >= 0 ? startIndex : 0;
        endIndex = endIndex < this.dataSrc.length ? endIndex : this.dataSrc.length - 1;

        this.setVisibleRage(startIndex, endIndex);
    }
};

export default DataSource;