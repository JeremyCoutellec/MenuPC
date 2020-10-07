import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import defaultJPG from '../../img/default.jpg';
import PacriBG from '../../img/PacriBG.jpg';
import PacriLogo from '../../img/PacriLogo.jpg';
import defaultLogo from '../../img/defaultLogo.jpg';

export default ({ menu, company }) => (
  <div id='wrapper' className='fade-in'>
    <div id='intro'>
      {menu && menu.logo ? (
        <img
          style={{ position: 'fixed' }}
          src={`./img/${menu.logo}`}
          alt='Logo'
        />
      ) : company && company.logo ? (
        <img
          style={{ position: 'fixed' }}
          src={`./img/${company.logo}`}
          alt='Logo'
        />
      ) : menu && menu._id === '5f6c5a0198f60926d00ac5f6' ? (
        <img
          style={{ position: 'fixed', zIndex: 1 }}
          src={PacriBG}
          alt='Logo'
        />
      ) : (
        <img
          style={{ position: 'fixed', zIndex: 1 }}
          src={defaultJPG}
          alt='Logo'
        />
      )}
      <div className='logoAvatar'>
        {menu && menu._id === '5f6c5a0198f60926d00ac5f6' ? (
          <Avatar
            alt={`Logo ${(company && company.name) || menu.name}`}
            src={PacriLogo}
            style={{
              height: '8rem',
              width: '8rem',
              border: 'white 2px solid',
              zIndex: 1,
            }}
          />
        ) : (
          <Avatar
            alt='Logo performance conseil'
            src={defaultLogo}
            style={{
              height: '8rem',
              width: '8rem',
              border: 'white 2px solid',
              zIndex: 1,
            }}
          />
        )}
      </div>
    </div>
  </div>
);
