import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { DatePicker } from 'antd'


class App extends Component {
    render() {
        return (
            <div>test</div>
        )
    }
}

ReactDOM.render(<DatePicker />, document.getElementById('test'))