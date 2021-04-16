import React, { ReactElement } from "react";

class BoardHOC extends React.Component {

    constructor(props: { component: ReactElement }) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return this.props.children;
    }
}

export default BoardHOC;