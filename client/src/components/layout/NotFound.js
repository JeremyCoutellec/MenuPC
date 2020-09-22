import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page Non Trouvé
      </h1>
      <p className='large'>Désolé, cette page n'existe pas</p>
    </Fragment>
  );
};

export default NotFound;
