import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMenu, updateMenu } from '../../actions/menu';
import Spinner from '../layout/Spinner';
import TextField from '@material-ui/core/TextField';

const UpdateMenu = ({
  menu: { menu, loading },
  getMenu,
  updateMenu,
  history,
}) => {
  useEffect(() => {
    if (!menu) {
      getMenu();
    } else if (!loading) {
      menu && setFormData(menu);
    }
  }, [getMenu, loading, menu]);

  const [formData, setFormData] = useState({
    name: menu ? menu.name : '',
    description: menu ? menu.description : '',
    dishes: menu ? menu.dishes : [],
  });

  const { name, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateMenu(formData, history);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Informations de la carte</h1>
      <p className='lead'>
        <i className='fas fa-file'></i> Ajoutons des informations
      </p>
      <small>* = champs requis</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='Nom de la carte'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
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
        <Link className='btn btn-light my-1' to='/dashboard'>
          Retour
        </Link>
      </form>
    </Fragment>
  );
};

UpdateMenu.propTypes = {
  updateMenu: PropTypes.func.isRequired,
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { getMenu, updateMenu })(
  withRouter(UpdateMenu)
);
