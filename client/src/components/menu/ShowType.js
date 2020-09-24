import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchType } from '../../actions/type';
import { get } from 'lodash';

const ShowType = ({ type: { type }, dishes, company, switchType }) => {
  return (
    <nav id='nav'>
      <ul className='links'>
        {dishes.filter(dish => dish.category && dish.category.type === 0)
          .length > 0 && (
          <li className={type === 0 ? 'active' : ''}>
            <button
              className='btn'
              onClick={() => switchType(0)}
              disabled={type === 0}
            >
              <i className='fa fa-utensils'></i>
            </button>
          </li>
        )}
        {dishes.filter(dish => dish.category && dish.category.type === 1)
          .length > 0 && (
          <li className={type === 1 ? 'active' : ''}>
            <button
              className='btn'
              onClick={() => switchType(1)}
              disabled={type === 1}
            >
              <i className='fa fa-coffee'></i>
            </button>
          </li>
        )}
        {dishes.filter(dish => dish.category && dish.category.type === 2)
          .length > 0 && (
          <li className={type === 2 ? 'active' : ''}>
            <button
              className='btn'
              onClick={() => switchType(2)}
              disabled={type === 2}
            >
              <i className='fa fa-glass-martini-alt'></i>
            </button>
          </li>
        )}

        {dishes.filter(dish => dish.category && dish.category.type === 3)
          .length > 0 && (
          <li className={type === 3 ? 'active' : ''}>
            <button
              className='btn'
              onClick={() => switchType(3)}
              disabled={type === 3}
            >
              <i className='fa fa-beer'></i>
            </button>
          </li>
        )}
      </ul>
      <ul className='icons'>
        {get(company, 'social.twitter') && (
          <li>
            <a
              target='_blank'
              href={`http://${company.social.twitter}`}
              className='icon brands fa-twitter'
            >
              <span className='label'>Twitter</span>
            </a>
          </li>
        )}
        {get(company, 'social.facebook') && (
          <li>
            <a
              target='_blank'
              href={`http://${company.social.facebook}`}
              className='icon brands fa-facebook-f'
            >
              <span className='label'>Facebook</span>
            </a>
          </li>
        )}
        {get(company, 'social.instagram') && (
          <li>
            <a
              target='_blank'
              href={`http://${company.social.instagram}`}
              className='icon brands fa-instagram'
            >
              <span className='label'>Instagram</span>
            </a>
          </li>
        )}
        {get(company, 'social.youtube') && (
          <li>
            <a
              target='_blank'
              href={`http://${company.social.youtube}`}
              className='icon brands fa-youtube'
            >
              <span className='label'>Youtube</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

ShowType.propTypes = {
  switchType: PropTypes.func.isRequired,
  type: PropTypes.object.isRequired,
  dishes: PropTypes.array.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  type: state.type,
});

export default connect(mapStateToProps, { switchType })(ShowType);
