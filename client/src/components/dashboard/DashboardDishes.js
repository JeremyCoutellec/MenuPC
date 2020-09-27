import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryForm from '../category/CategoryForm';
import DishForm from '../dish/DishForm';
import { getCategoriesByType, removeCategory } from '../../actions/category';
import { getAllDishes, removeDish } from '../../actions/dish';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';

const DashboardDishes = ({
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

  const [isDishForm, toggleDishForm] = useState({});

  const [isCategoryForm, toggleCategoryForm] = useState(false);

  return (
    <Grid container spacing={1}>
      {categories.map(category => (
        <Grid
          container
          item
          className='menu bg-light'
          xs={12}
          key={category._id}
        >
          <Grid
            container
            item
            xs={12}
            justify='flex-end'
            style={{ padding: '1rem' }}
          >
            <Grid item xs={8}>
              <h4>{category.name}</h4>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Button
                fullWidth
                variant='outlined'
                startIcon={<AddCircle />}
                onClick={() =>
                  toggleDishForm({
                    ...isDishForm,
                    [category._id]: !isDishForm[category._id],
                  })
                }
              >
                Ajouter
              </Button>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => removeCategory(category._id)}
                startIcon={<DeleteIcon />}
              >
                Retirer
              </Button>
            </Grid>
            <Grid item xs={12}>
              <span>{category.description}</span>
            </Grid>
          </Grid>
          {dishes
            .filter(dish => dish.category === category._id)
            .map(dish => (
              <Paper
                style={{ width: '100%', padding: '1rem', margin: '1rem 0' }}
                key={dish._id}
              >
                <Grid container item xs={12}>
                  <Grid item xs={2} sm={1}>
                    <Switch
                      checked={true}
                      color='primary'
                      name='checkedB'
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Grid>
                  <Grid item xs={7} sm={8}>
                    <h4>{dish.name}</h4>
                    <p className='my-1'>
                      <span>{dish.composition.join(', ')}</span>
                    </p>
                    <p className='my-1'>
                      <span>{dish.description}</span>
                    </p>
                  </Grid>
                  <Grid item xs={1}>
                    <h4>{dish.price.toFixed(2)}€</h4>
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <Button
                      fullWidth
                      onClick={() => removeDish(dish._id)}
                      color='secondary'
                      startIcon={<DeleteIcon />}
                    >
                      Retirer
                    </Button>
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
          <Button
            fullWidth
            onClick={() => toggleCategoryForm(true)}
            variant='outlined'
          >
            Ajouter une catégorie
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

DashboardDishes.propTypes = {
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
