import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCategory } from '../../actions/category';

const CategoryForm = ({ toggleCategoryForm, type: { type }, addCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    type,
    description: '',
  });

  const { name, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addCategory(formData);
    toggleCategoryForm(false);
  };

  return (
    <Fragment>
      <h2 className='large text-primary'>Ajout d'une catégorie</h2>
      <small>* = champs requis</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nom de la catégorie'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
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
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Enregistrer'
        />
      </form>
    </Fragment>
  );
};

CategoryForm.propTypes = {
  type: PropTypes.object.isRequired,
  addCategory: PropTypes.func.isRequired,
  toggleCategoryForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  type: state.type,
});

export default connect(mapStateToProps, { addCategory })(CategoryForm);
