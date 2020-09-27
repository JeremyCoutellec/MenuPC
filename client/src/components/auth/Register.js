import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' to='#'>
        QResto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    twitter: '',
    facebook: '',
    tripadvisor: '',
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
    tripadvisor,
    twitter,
    facebook,
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
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          style={{
            margin: '1rem',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          S'inscrire
        </Typography>
        <form
          className='form'
          style={{
            width: '100%',
          }}
          onSubmit={e => onSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <i className='fas fa-user'></i> Créer votre compte
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                autoComplete='name'
                type='text'
                label='Nom'
                name='name'
                id='name'
                value={name}
                onChange={e => onChange(e)}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Adresse email'
                name='email'
                autoComplete='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Mot de Passe'
                type='password'
                id='password'
                autoComplete='current-password'
                minLength='6'
                value={password}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='Confirmation du Mot de Passe'
                type='password'
                id='password2'
                minLength='6'
                value={password2}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <i className='fas fa-file'></i> Ajoutons des informations sur
              l'entreprise
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='companyName'
                label="Nom de l'entreprise"
                id='companyName'
                value={companyName}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='Localisation'
                label='Localisation'
                id='localisation'
                value={localisation}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Ajouter l'adresse de l'entreprise
              </small>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                required
                name='companyEmail'
                label='Email'
                placeholder='mon-entreprise@gmail.com'
                id='companyEmail'
                value={companyEmail}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Ajouter l'email de l'entreprise
              </small>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='description'
                label='Description'
                id='description'
                value={description}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Ajouter une description afin de donner des indications à vos
                clients
              </small>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                name='website'
                label='Site Web'
                placeholder="'http://www.mon-entreprise.com"
                id='website'
                value={website}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Ajouter le lien vers le site web de l'entreprise
              </small>
            </Grid>
            <Grid item xs={12}>
              <button
                onClick={() => toggleIsSocial()}
                type='button'
                className='btn btn-light'
                style={{ width: '100%' }}
              >
                Réseaux sociaux de l'entreprise
              </button>
              <span>Optionel</span>
            </Grid>
            {isSocial && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <i className='fab fa-facebook fa-2x'></i>
                  <TextField
                    variant='outlined'
                    fullWidth
                    name='facebook'
                    label='Facebook URL'
                    id='facebook'
                    value={facebook}
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <i className='fab fa-instagram fa-2x'></i>
                  <TextField
                    variant='outlined'
                    fullWidth
                    name='instagram'
                    label='Instagram URL'
                    id='instagram'
                    value={instagram}
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <i className='fab fa-twitter fa-2x'></i>
                  <TextField
                    variant='outlined'
                    fullWidth
                    name='twitter'
                    label='Twitter URL'
                    id='twitter'
                    value={twitter}
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <i className='fab fa-tripadvisor fa-2x'></i>
                  <TextField
                    variant='outlined'
                    fullWidth
                    name='tripadvisor'
                    label='Tripadvisor URL'
                    id='tripadvisor'
                    value={tripadvisor}
                    onChange={e => onChange(e)}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid xs={12} style={{ margin: '3rem 0rem 2rem' }}>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              S'inscrire
            </Button>
          </Grid>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                Vous avez déjà un compte? S'identifier
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
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
