import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDish } from '../../actions/dish';
import TextField from '@material-ui/core/TextField';

const DishForm = ({
  toggleDishForm,
  isDishForm,
  category: { _id, name: categoryName },
  addDish,
}) => {
  const [formData, setFormData] = useState({
    category: _id,
    name: '',
    price: 0,
    composition: '',
    description: '',
    visibile: true,
  });

  const { name, price, composition, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addDish(formData);
    setFormData({
      category: _id,
      name: '',
      price: 0,
      composition: '',
      description: '',
      visibile: true,
    });
    toggleDishForm({
      ...isDishForm,
      [_id]: !isDishForm[_id],
    });
  };

  return (
    <Fragment>
      <h5 className='text-primary'>Ajout dans {categoryName}</h5>
      <small>* = champs requis</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='Nom'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <TextField
            type='number'
            name='price'
            step='0.01'
            value={price}
            min={0}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Tarif en euros</small>
        </div>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='Composition'
            name='composition'
            value={composition}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Ajouter une composition en séparent les ingrédients par des ','
          </small>
        </div>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Ajouter une description afin de donner des indications à vos clients
          </small>
        </div>
        <TextField
          type='submit'
          className='btn btn-primary my-1'
          value='Enregistrer'
        />
      </form>
    </Fragment>
  );
};

DishForm.propTypes = {
  addDish: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  toggleDishForm: PropTypes.func.isRequired,
  isDishForm: PropTypes.object.isRequired,
};

export default connect(null, { addDish })(DishForm);
