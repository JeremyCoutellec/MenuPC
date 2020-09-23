import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    companyName: '',
    localisation: '',
    companyEmail: '',
    description: '',
    website: '',
    isSocial: false,
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  const {
    name,
    email,
    password,
    password2,
    companyName,
    description,
    localisation,
    companyEmail,
    website,
    isSocial,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(formData);
    }
  };

  const toggleIsSocial = () =>
    setFormData({ ...formData, isSocial: !formData.isSocial });

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>S'inscrire</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Créer votre compte
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nom'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Adresse email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Mot de Passe'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirmation du Mot de Passe'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <Fragment>
          <p className='lead'>
            <i className='fas fa-file'></i> Ajoutons des informations sur
            l'entreprise
          </p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder="Nom de l'entreprise"
                name='companyName'
                value={companyName}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Localisation'
                name='localisation'
                value={localisation}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Ajouter l'adresse de l'entreprise
              </small>
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='mon-entreprise@gmail.com'
                name='companyEmail'
                value={companyEmail}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Ajouter l'email de l'entreprise
              </small>
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
                Ajouter une description afin de donner des indications à vos
                clients
              </small>
            </div>
            <div className='form-group'>
              <input
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
                  <i className='fab fa-twitter fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Twitter URL'
                    name='twitter'
                    value={twitter}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-facebook fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Facebook URL'
                    name='facebook'
                    value={facebook}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-youtube fa-2x'></i>
                  <input
                    type='text'
                    placeholder='YouTube URL'
                    name='youtube'
                    value={youtube}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-linkedin fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Linkedin URL'
                    name='linkedin'
                    value={linkedin}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className='form-group social-input'>
                  <i className='fab fa-instagram fa-2x'></i>
                  <input
                    type='text'
                    placeholder='Instagram URL'
                    name='instagram'
                    value={instagram}
                    onChange={e => onChange(e)}
                  />
                </div>
              </Fragment>
            )}
          </form>
        </Fragment>
        <input type='submit' className='btn btn-primary' value="S'inscrire" />
      </form>
      <p className='my-1'>
        Vous avez déjà un compte? <Link to='/login'>S'identifier</Link>
      </p>
      ;
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
