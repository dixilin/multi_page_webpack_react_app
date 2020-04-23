import React from 'react';
import ReactDOM from 'react-dom';

import 'lib-flexible';
import common from '@/utils/common';
import Demo from './demo';

const App = () => (
  <div>
    <span>{common()}</span>
    <Demo />
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
