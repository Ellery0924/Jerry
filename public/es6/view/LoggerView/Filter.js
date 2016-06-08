/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';

export default React.createClass({
    _onSelectMethod(method){

        const {filter}=this.props;
        var regex = this.refs.regexInput.value;

        if (method !== this.currentMethod) {

            this.currentMethod = method;
            filter({method, regex});
        }
    },
    _resetFilter(){

        const {filter}=this.props;
        filter({method: 'ALL', regex: ''});
    },
    componentWillMount(){

        this.currentMethod = 'ALL';
    },
    render(){

        const {method, regex}=this.props.condition;
        var methodText = method === 'ALL' ? '不限 ' : method;

        return (
            <div className="filter">
                <div className="filter-input">
                    <div className="input-group">
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                {methodText}<span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a ref="allSelect" onClick={()=>this._onSelectMethod('ALL')} data-method='ALL'
                                       href="javascript:void 0;">不限</a>
                                </li>
                                <li><a ref="getSelect" onClick={()=>this._onSelectMethod('GET')} data-method='GET'
                                       href="javascript:void 0;">GET</a></li>
                                <li><a ref="postSelect" onClick={()=>this._onSelectMethod('POST')} data-method='POST'
                                       href="javascript:void 0">POST</a></li>
                            </ul>
                        </div>
                        <input ref="regexInput" type="text" placeholder="输入正则表达式或者字符串" className="form-control"/>
                    </div>
                </div>
                <button type="button" onClick={this._resetFilter} className="btn btn-danger reset-btn">重置</button>
            </div>
        );
    }
});