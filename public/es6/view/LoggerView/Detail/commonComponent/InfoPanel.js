/**
 * Created by Ellery1 on 16/6/16.
 */
import React from 'react';

export default React.createClass({
    render(){
        const { id, title, isCollapsed } = this.props;
        const panelName = id + "-panel",
            controlId = id + "-accordion-control",
            contentId = id + "-accordion-content";

        return (
            <div className="panel-group" role="tablist" aria-multiselectable="true" id={panelName}>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab">
                        <h4 className="panel-title">
                            <a role="button" data-toggle="collapse" data-parent={panelName}
                               href={"#" + contentId} id={controlId}
                               aria-expanded="false" aria-controls={contentId}>
                                {title}
                            </a>
                        </h4>
                    </div>
                    <div id={contentId} className={"panel-collapse collapse " + (!isCollapsed ? "in" : "")}
                         role="tabpanel"
                         aria-labelledby={controlId}>
                        <ul className="panel-body">
                            {this.props.children}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});