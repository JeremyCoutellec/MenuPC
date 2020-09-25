import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchType } from '../../actions/type';
import { get } from 'lodash';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';

const ShowType = ({ type: { type }, dishes, company, switchType }) => {
  const handleType = (event, newType) => {
    switchType(newType);
  };

  return (
    <div className='typeMenu'>
      <Grid container>
        <Grid item xs={8}>
          <ul className='links'>
            <ToggleButtonGroup
              value={type}
              exclusive
              onChange={handleType}
              aria-label='text alignment'
            >
              {dishes.filter(dish => dish.category && dish.category.type === 0)
                .length > 0 && (
                <ToggleButton
                  value={0}
                  aria-label='left aligned'
                  disabled={type === 0}
                >
                  <i className='fa fa-utensils'></i>
                </ToggleButton>
              )}
              {dishes.filter(dish => dish.category && dish.category.type === 1)
                .length > 0 && (
                <ToggleButton
                  value={1}
                  aria-label='centered'
                  disabled={type === 1}
                >
                  <i className='fa fa-coffee'></i>
                </ToggleButton>
              )}
              {dishes.filter(dish => dish.category && dish.category.type === 2)
                .length > 0 && (
                <ToggleButton
                  value={2}
                  aria-label='right aligned'
                  disabled={type === 2}
                >
                  <i className='fa fa-glass-martini-alt'></i>
                </ToggleButton>
              )}
              {dishes.filter(dish => dish.category && dish.category.type === 3)
                .length > 0 && (
                <ToggleButton
                  value={3}
                  aria-label='justified'
                  disabled={type === 3}
                >
                  <i className='fa fa-beer'></i>
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          </ul>
        </Grid>

        <Grid item xs={4}>
          <ul className='icons' style={{ float: 'right' }}>
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
        </Grid>
      </Grid>
    </div>
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
