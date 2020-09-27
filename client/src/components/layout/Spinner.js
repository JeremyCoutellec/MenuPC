import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => (
  <Fragment>
    <img
      src={CircularProgress}
      style={{ with: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
