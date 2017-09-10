import React from 'react';
import ReactDOM from 'react-dom';
import Main from './timer/main';

import {TimerStore} from './timer/TimerStore';
import {useStrict} from 'mobx';

useStrict(true);

const timerStore = new TimerStore();

ReactDOM.render(<div>
    <Main
        timerStore={timerStore}
    />
</div>, document.getElementById('root'));

