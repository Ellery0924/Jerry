/**
 * Created by Ellery1 on 16/6/7.
 */
import React from 'react';

export default React.createClass({
    render(){

        return (
            <div className="logger-right-content">
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="log-detail-first-tab active">
                        <a href="#home" aria-controls="home" role="tab"
                           data-toggle="tab">
                            Overview
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
                            Request
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">
                            Response
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="home">

                    </div>
                    <div role="tabpanel" className="tab-pane" id="profile">
                    </div>
                    <div role="tabpanel" className="tab-pane" id="messages">

                    </div>
                </div>
            </div>
        );
    }
});
