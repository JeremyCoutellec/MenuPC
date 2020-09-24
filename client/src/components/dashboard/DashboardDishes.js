import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryForm from '../category/CategoryForm';
import DishForm from '../dish/DishForm';
import { getCategoriesByType, removeCategory } from '../../actions/category';
import { getAllDishes, removeDish } from '../../actions/dish';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    <Grid container>
      {categories.map(category => (
        <Grid
          container
          row
          item
          className='menu bg-light'
          xs={12}
          key={category._id}
        >
          <Grid container item={12} style={{ padding: '1rem' }}>
            <Grid item xs={8}>
              <h2>{category.name}</h2>
              <p className='my-1'>
                <span>{category.description}</span>
              </p>
            </Grid>
            <Grid item xs={2}>
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
            </Grid>
            <Grid item xs={2}>
              <button
                onClick={() => removeCategory(category._id)}
                className='btn btn-primary'
                type='button'
              >
                Retirer
              </button>
            </Grid>
          </Grid>
          {dishes
            .filter(dish => dish.category === category._id)
            .map(dish => (
              <Paper
                style={{ width: '100%', padding: '1rem', margin: '1rem 0' }}
              >
                <Grid container row item xs={12} key={dish._id}>
                  <Grid item xs={8}>
                    <h4>{dish.name}</h4>
                    <p className='my-1'>
                      <span>{dish.composition.join(', ')}</span>
                    </p>
                    <p className='my-1'>
                      <span>{dish.description}</span>
                    </p>
                  </Grid>
                  <Grid item xs={2}>
                    <h4>{dish.price.toFixed(2)}€</h4>
                  </Grid>
                  <Grid item xs={2}>
                    <button
                      onClick={() => removeDish(dish._id)}
                      className='btn btn-primary'
                      type='button'
                    >
                      Retirer
                    </button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          {(isDishForm[category._id] ||
            dishes.filter(dish => dish.category === category._id).length ===
              0) && (
            <Grid item xs={12}>
              <Paper
                style={{ width: '100%', padding: '1rem', margin: '1rem 0' }}
              >
                <DishForm
                  category={category}
                  toggleDishForm={toggleDishForm}
                  isDishForm={isDishForm}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      ))}
      {/* Add Category */}
      {isCategoryForm ? (
        <Grid item xs={12}>
          <CategoryForm type={type} toggleCategoryForm={toggleCategoryForm} />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <button
            onClick={() => toggleCategoryForm(true)}
            className='btn btn-primary'
            type='button'
          >
            Ajouter une catégorie
          </button>
        </Grid>
      )}
    </Grid>
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
