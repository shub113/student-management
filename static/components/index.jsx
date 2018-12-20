import * as React from 'react';
import * as ReactDom from 'react-dom';

export class Index extends React.Component {
    render() {
        return (
            <div>React</div>
        );
    }
}

ReactDom.render(<Index/>, document.getElementById('root'))