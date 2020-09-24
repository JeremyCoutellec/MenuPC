import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoriesByTypeByUserId } from '../../actions/category';
import Spinner from '../layout/Spinner';
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
    <Spinner />
  ) : (
    <div>
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
                <Typography>
                  <h3>{category.name}</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ display: 'block' }}>
                <Typography style={{ width: '100%' }}>
                  {dishCategory.map(dish => (
                    <Paper
                      key={dish._id}
                      style={{ padding: '2rem', marginTop: '1rem' }}
                    >
                      <Grid
                        container
                        direction='row'
                        justify='center'
                        alignItems='center'
                      >
                        <Grid item xs={9} spacing={3}>
                          <h5>{dish.name}</h5>
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          spacing={3}
                          style={{ textAlign: 'right' }}
                        >
                          {dish.price.toFixed(2)}€
                        </Grid>
                        <Grid item xs={12} spacing={3}>
                          <p className='my-1'>
                            <span>{dish.composition.join(', ')}</span>
                          </p>
                        </Grid>
                        <Grid item xs={12} spacing={3}>
                          <p className='my-1'>
                            <span>{dish.description}</span>
                          </p>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Typography>
                <Typography style={{ padding: '2rem 2rem 1rem 2rem' }}>
                  <h6>{category.description}</h6>
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
