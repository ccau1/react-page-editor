import React from 'react';

import TextField from 'material-ui/TextField';

const NonNullTextField = props => {
  let {value, type = 'text', onChange, ...rest} = props;

  switch (type) {
    case 'number':
      value = !!value ? value : 0;
      break;
    case 'text':
      value = !!value ? value : '';
  }

  const handleOnChange = (ev: Object, newValue: string) => {
    let v = newValue;
    switch (type) {
      case 'number':
        v = parseFloat(v) ? v : '0';
        break;
    }
    onChange&&onChange.call(onChange, v, ev);
  };

  return (
    <TextField {...rest} onChange={handleOnChange} type={type} value={value} />
  );
};
export {NonNullTextField};

export default TextField;
