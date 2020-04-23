import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import common from '@/utils/common';

import 'lib-flexible';
import './index.less';


const App = () => {
  const [timer, setTimer] = useState(
    moment().format('MMMM Do YYYY, h:mm:ss a'),
  );

  useEffect(() => {
    setInterval(() => {
      setTimer(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
  });
  return (
    <div>
      <h1>{common()}</h1>
      <p>{timer}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
