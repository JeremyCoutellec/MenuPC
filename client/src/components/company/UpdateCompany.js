import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCompany, getCompany } from '../../actions/company';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

const UpdateCompany = ({
  company: { company, loading },
  updateCompany,
  getCompany,
  history,
}) => {
  useEffect(() => {
    if (!company) {
      getCompany();
    } else if (!loading && company) {
      setFormData({
        name: company.name,
        localisation: company.localisation,
        email: company.email,
        description: company.description,
        website: company.website,
        isSocial:
          company.social.tripadvisor ||
          company.social.twitter ||
          company.social.facebook ||
          company.social.instagram,
        twitter: company.social.twitter,
        facebook: company.social.facebook,
        tripadvisor: company.social.tripadvisor,
        instagram: company.social.instagram,
      });
    }
  }, [getCompany, loading, company]);

  const [formData, setFormData] = useState({
    name: company ? company.name : '',
    localisation: company ? company.localisation : '',
    email: company ? company.email : '',
    description: company ? company.description : '',
    website: company ? company.website : '',
    isSocial: false,
    twitter: company && company.social ? company.social.twitter : '',
    facebook: company && company.social ? company.social.facebook : '',
    tripadvisor: company && company.social ? company.social.tripadvisor : '',
    instagram: company && company.social ? company.social.instagram : '',
  });

  const {
    name,
    description,
    localisation,
    email,
    website,
    isSocial,
    twitter,
    facebook,
    tripadvisor,
    instagram,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateCompany({ ...formData }, history);
  };

  const toggleIsSocial = () =>
    setFormData({ ...formData, isSocial: !formData.isSocial });

  return loading ? (
    <CircularProgress />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Informations sur l'entreprise</h1>
      <p className='lead'>
        <i className='fas fa-file'></i> Ajoutons des informations sur
        l'entreprise
      </p>
      <small>* = champs requis</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder="Nom de l'entreprise"
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='Localisation'
            name='localisation'
            value={localisation}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ajouter l'adresse de l'entreprise</small>
        </div>
        <div className='form-group'>
          <TextField
            type='email'
            placeholder='mon-entreprise@gmail.com'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ajouter l'email de l'entreprise</small>
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
        <div className='form-group'>
          <TextField
            type='text'
            placeholder='http://www.mon-entreprise.com'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Ajouter le lien vers le site web de l'entreprise
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleIsSocial()}
            type='button'
            className='btn btn-light'
          >
            Ajouter des liens vers les réseaux sociaux de l'entreprise
          </button>
          <span>Optionel</span>
        </div>

        {isSocial && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <TextField
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <TextField
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-tripadvisor fa-2x'></i>
              <TextField
                type='text'
                placeholder='Tripadvisor URL'
                name='tripadvisor'
                value={tripadvisor}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>

              <TextField
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}
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

UpdateCompany.propTypes = {
  getCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  company: state.company,
});

export default connect(mapStateToProps, { updateCompany, getCompany })(
  withRouter(UpdateCompany)
);
