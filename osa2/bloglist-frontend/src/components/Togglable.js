import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const { buttonLabel, children, details } = props;

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      visible,
    };
  });

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return details ? (
    <div className='details' style={showWhenVisible}>
      {children}
    </div>
  ) : (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {buttonLabel ? buttonLabel : 'Reveal'}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
