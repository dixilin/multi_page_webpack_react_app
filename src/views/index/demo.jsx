import React, { useState } from 'react';
import './demo.less';
import demoImg from '../../img/demo.jpg';

export default () => {
  const [lazyLoad, setLazyLoad] = useState(null);
  const handleLazyLoad = async () => {
    const res = await import(/* webpackChunkName: 'lazyLoad' */ './lazyload.js');
    setLazyLoad(res.default);
  };
  return (
    <div className="demo">
      <button onClick={handleLazyLoad} type="button">
        lazyLoad
      </button>
      {lazyLoad}
      <img src={demoImg} alt="" />
    </div>
  );
};
