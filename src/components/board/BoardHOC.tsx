import React from "react";

class BoardHOC extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return this.props.children;
    }
}

export default BoardHOC;