import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryForm from '../category/CategoryForm';
import DishForm from '../dish/DishForm';
import { getCategoriesByType, removeCategory } from '../../actions/category';
import { getAllDishes, removeDish } from '../../actions/dish';

const DashboardDishes = ({
  menu,
  type: { type },
  dish: { dishes },
  category: { categories },
  getCategoriesByType,
  removeCategory,
  getAllDishes,
  removeDish,
}) => {
  useEffect(() => {
    getCategoriesByType(type);
    getAllDishes();
  }, [getCategoriesByType, getAllDishes, type]);

  const [isDishForm, toggleDishForm] = useState([]);

  const [isCategoryForm, toggleCategoryForm] = useState(false);

  return (
    <div>
      {categories.map(category => (
        <div className='menu bg-light' key={category._id}>
          <div>
            <h2>{category.name}</h2>
            <p className='my-1'>
              <span>{category.description}</span>
            </p>
          </div>
          <div>
            <button
              onClick={() =>
                toggleDishForm({
                  ...isDishForm,
                  [category._id]: !isDishForm[category._id],
                })
              }
              className='btn btn-primary'
              type='button'
            >
              Ajouter
            </button>
          </div>
          <div>
            <button
              onClick={() => removeCategory(category._id)}
              className='btn btn-primary'
              type='button'
            >
              Retirer
            </button>
          </div>
          {dishes
            .filter(dish => dish.category === category._id)
            .map(dish => (
              <Fragment key={dish._id}>
                <div>
                  <h4>{dish.name}</h4>
                  <p className='my-1'>
                    <span>{dish.composition.join(', ')}</span>
                  </p>
                  <p className='my-1'>
                    <span>{dish.description}</span>
                  </p>
                </div>
                <div>
                  <h4>{dish.price.toFixed(2)}€</h4>
                </div>
                <div>
                  <button
                    onClick={() => removeDish(dish._id)}
                    className='btn btn-primary'
                    type='button'
                  >
                    Retirer
                  </button>
                </div>
              </Fragment>
            ))}
          {(isDishForm[category._id] ||
            dishes.filter(dish => dish.category === category._id).length ===
              0) && (
            <div>
              <DishForm
                category={category}
                toggleDishForm={toggleDishForm}
                isDishForm={isDishForm}
              />
            </div>
          )}
        </div>
      ))}
      {/* Add Category */}
      {isCategoryForm ? (
        <div>
          <CategoryForm type={type} toggleCategoryForm={toggleCategoryForm} />
        </div>
      ) : (
        <div>
          <button
            onClick={() => toggleCategoryForm(true)}
            className='btn btn-primary'
            type='button'
          >
            Ajouter une catégorie
          </button>
        </div>
      )}
    </div>
  );
};

DashboardDishes.propTypes = {
  menu: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  getCategoriesByType: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  dish: PropTypes.object.isRequired,
  getAllDishes: PropTypes.func.isRequired,
  removeDish: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  type: state.type,
  category: state.category,
  dish: state.dish,
});

export default connect(mapStateToProps, {
  removeCategory,
  getCategoriesByType,
  removeDish,
  getAllDishes,
})(DashboardDishes);
