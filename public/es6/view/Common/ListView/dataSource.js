/**
 * Created by Ellery1 on 16/6/7.
 */
function DataSource(opt) {

    this.currentY = 0;
    this.visibleRange = [0, opt.visibleRange];
}

DataSource.prototype = {
    refresh(opt){

        var self = this;
        this.itemHeight = opt.itemHeight;
        this.dataSrc = opt.dataSrc.map((itemData, i)=>Object.assign({}, itemData, {top: i * self.itemHeight}));
        this.containerHeight = opt.containerHeight;
        this.currentY = this.currentY > this.getMaxScrollTop() ? this.getMaxScrollTop() : this.currentY;
        this.configureVisibleRange(this.currentY);
    },
    setVisibleRage(start, end){

        this.visibleRange = [start, end];
    },
    getVisibleItems(){

        return [].slice.apply(this.dataSrc, this.visibleRange);
    },
    getContentHeight(){
        
        return this.dataSrc.length * this.itemHeight + 20;
    },
    getMaxScrollTop(){

        return Math.ceil(this.getContentHeight() - this.containerHeight);
    },
    configureVisibleRange(offsetY){

        var startY = offsetY - this.containerHeight,
            endY = offsetY + 2 * this.containerHeight,
            startIndex = Math.ceil(startY / this.itemHeight),
            endIndex = Math.floor(endY / this.itemHeight);

        this.currentY = offsetY;
        startIndex = startIndex >= 0 ? startIndex : 0;
        endIndex = endIndex < this.dataSrc.length ? endIndex : this.dataSrc.length;

        this.setVisibleRage(startIndex, endIndex);
    }
};

export default DataSource;