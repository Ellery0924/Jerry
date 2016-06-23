/**
 * Created by Ellery1 on 16/1/1.
 */
import React, {Component} from 'react'
import {Link} from 'react-router';
import wsClient from '../../wsClient';

export default React.createClass({
    _onLogNavClick(){

        wsClient.emit('refreshLog');
    },
    render(){
        return <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="javascript:void 0;">Jerry</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li nav-hash="#">
                            <Link
                                activeClassName="active"
                                to="/"
                            >
                                代理面板
                            </Link>
                        </li>
                        <li nav-hash="#logger" onClick={this._onLogNavClick}><Link activeClassName="active" to="logger">请求/响应日志</Link>
                        </li>
                        <li nav-hash="#rewrite"><Link activeClassName="active" to="rewrite">URL MAP</Link></li>
                        <li nav-hash="#server"><Link activeClassName="active" to="server">服务器组配置</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a target="_blank"
                               href="https://chrome.google.com/webstore/detail/qproxy/nbilnamflokjimlgajofochkjdmlohao/related">
                                Chrome Extension (By Barret.Ma)
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="http://camsong.github.io/redux-in-chinese/">
                                Powered By React-Redux
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/Ellery0924/QProxy">
                                Github
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/Ellery0924/QProxy">
                                文档
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    }
});