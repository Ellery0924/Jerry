/**
 * Created by Ellery1 on 16/1/2.
 */
import React from 'react';
import {exportHostList} from '../../../utils';

export default React.createClass({
    componentDidMount(){
        $(this.refs.exportHostModal).on('shown.bs.modal', ()=>
            $(this.refs.exportHostDisplay).val(this.props.hostList).select()
        );
    },
    render(){
        return (
            <div ref="exportHostModal" className="modal" id="exportHostModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">导出Host</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <textarea
                                    ref="exportHostDisplay"
                                    type="text"
                                    className="exportHostDisplay"
                                    id="exportHostDisplay"
                                    defaultValue={this.props.hostList}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal">
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});