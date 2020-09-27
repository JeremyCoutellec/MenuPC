import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoriesByTypeByUserId } from '../../actions/category';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    <CircularProgress />
  ) : (
    <div
      style={{
        zIndex: '-1',
        paddingTop: '8rem',
      }}
    >
      {categories.map(category => {
        const dishCategory = dishes.filter(
          dish => dish.category && dish.category._id === category._id
        );

        return (
          dishCategory.length > 0 && (
            <Accordion key={category._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography variant='h6'>{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ display: 'block' }}>
                {dishCategory.map(dish => (
                  <Paper
                    key={dish._id}
                    style={{
                      padding: '2rem',
                      marginTop: '1rem',
                      width: '100%',
                    }}
                  >
                    <Grid
                      container
                      direction='row'
                      justify='center'
                      alignItems='center'
                      spacing={3}
                    >
                      <Grid item xs={9}>
                        <Typography variant='h6'>{dish.name}</Typography>
                      </Grid>
                      <Grid item xs={3} style={{ textAlign: 'right' }}>
                        <Typography variant='h6'>
                          {dish.price.toFixed(2)}€
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='h6'>
                          {dish.composition.join(', ')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='h6'>{dish.description}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Typography
                  style={{ padding: '2rem 2rem 1rem 2rem' }}
                  variant='h6'
                >
                  {category.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
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
