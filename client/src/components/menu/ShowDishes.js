import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoriesByTypeByUserId } from '../../actions/category';
import Spinner from '../layout/Spinner';

const ShowDishes = ({
  type: { type },
  user,
  dishes,
  category: { categories, loading },
  getCategoriesByTypeByUserId,
}) => {
  useEffect(() => {
    getCategoriesByTypeByUserId(type, user);
  }, [getCategoriesByTypeByUserId, type, user]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {categories.map(category => {
        const dishCategory = dishes.filter(
          dish => dish.category && dish.category._id === category._id
        );

        return (
          dishCategory.length > 0 && (
            <div className='showMenu bg-light' key={category._id}>
              <div>
                <h2>{category.name}</h2>
                <p className='my-1'>
                  <span>{category.description}</span>
                </p>
              </div>
              {dishCategory.map(dish => (
                <Fragment key={dish._id}>
                  <div>
                    <h4>
                      {dish.name}
                      <div>
                        <h4>{dish.price.toFixed(2)}€</h4>
                      </div>
                    </h4>
                    <p className='my-1'>
                      <span>{dish.composition.join(', ')}</span>
                    </p>
                    <p className='my-1'>
                      <span>{dish.description}</span>
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          )
        );
      })}
    </div>
  );
};

ShowDishes.propTypes = {
  type: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  getCategoriesByTypeByUserId: PropTypes.func.isRequired,
  dishes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  type: state.type,
  category: state.category,
});

export default connect(mapStateToProps, {
  getCategoriesByTypeByUserId,
})(ShowDishes);
