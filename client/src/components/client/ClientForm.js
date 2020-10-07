import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddCircle from '@material-ui/icons/AddCircle';
import { Button, Typography } from '@material-ui/core';

import { getMenuById } from '../../actions/menu';
import { getCompanyByUserId } from '../../actions/company';
import { createClients } from '../../actions/client';
import WrapperCompany from '../layout/WrapperCompany';
import Modal from '../layout/Modal';

const ClientForm = ({
  company: { company, loading: loadingCompany },
  menu: { menu, loading },
  getMenuById,
  getCompanyByUserId,
  createClients,
  match,
}) => {
  useEffect(() => {
    if (!menu) {
      getMenuById(match.params.id);
    } else {
      getCompanyByUserId(menu.user);
    }
  }, [getMenuById, getCompanyByUserId, menu, loading, match.params.id]);

  const [formData, setFormData] = useState([
    {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
    },
  ]);

  const onChange = (e, index) => {
    const newClients = formData;
    const name = e.target.name.slice(0, e.target.name.lastIndexOf('-'));
    const value = e.target.value;
    newClients[index] = {
      ...formData[index],
      [name]: value,
    };
    setFormData([...newClients]);
  };

  const onSubmit = e => {
    e.preventDefault();
    createClients(formData, company._id, menu._id);
  };

  return loading || loadingCompany ? (
    <CircularProgress />
  ) : (
    <Fragment>
      <Modal />
      <WrapperCompany menu={menu} company={company} />
      <Grid container style={{ margin: '4rem 0', zIndex: 0 }}>
        <Grid
          container
          item
          xs={12}
          style={{ textAlign: 'center', margin: '2rem' }}
        >
          <Grid item xs={12}>
            <Typography variant='h5'>Bienvenu chez "{company.name}"</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>
              Merci de remplir ce formulaire de présence
            </Typography>
          </Grid>
        </Grid>
        {!loadingCompany && (
          <Grid container item xs={12}>
            <form className='form formClient' onSubmit={e => onSubmit(e)}>
              {formData.map((client, index) => {
                const { lastName, firstName, email, phone } = client;
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    key={index}
                    style={{
                      padding: '2rem',
                      backgroundColor:
                        index % 2 === 0
                          ? 'rgb(246, 246, 246)'
                          : 'rgb(255, 255, 255)',
                    }}
                  >
                    <Grid item xs={12}>
                      <Typography variant='h5'>Client N°{index + 1}</Typography>
                    </Grid>
                    <Grid item container spacing={2} xs={12}>
                      <Grid item xs={6} md={3}>
                        <TextField
                          type='text'
                          fullWidth
                          required
                          placeholder='Nom *'
                          name={`lastName-${index}`}
                          value={lastName}
                          onChange={e => onChange(e, index)}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <TextField
                          fullWidth
                          required
                          type='text'
                          placeholder='Prénom *'
                          name={`firstName-${index}`}
                          value={firstName}
                          onChange={e => onChange(e, index)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          type='email'
                          required
                          fullWidth
                          placeholder='Email *'
                          name={`email-${index}`}
                          value={email}
                          onChange={e => onChange(e, index)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          type='tel'
                          fullWidth
                          placeholder='Téléphone'
                          name={`phone-${index}`}
                          value={phone}
                          onChange={e => onChange(e, index)}
                        />
                      </Grid>

                      {index === formData.length - 1 &&
                        (client.lastName !== '' ||
                          client.firstName !== '' ||
                          client.email !== '' ||
                          client.phone !== '') && (
                          <Grid item xs={12} md={12}>
                            <Button
                              fullWidth
                              variant='outlined'
                              startIcon={<AddCircle />}
                              onClick={() =>
                                setFormData([
                                  ...formData,
                                  {
                                    lastName: '',
                                    firstName: '',
                                    email: '',
                                    phone: '',
                                  },
                                ])
                              }
                            >
                              Ajouter un client
                            </Button>
                          </Grid>
                        )}
                    </Grid>
                  </Grid>
                );
              })}
              <Grid item xs={12} style={{ marginTop: '3rem' }}>
                <TextField
                  fullWidth
                  type='submit'
                  className='btn btn-primary my-1'
                  value='Enregistrer'
                />
              </Grid>
            </form>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

ClientForm.propTypes = {
  getMenuById: PropTypes.func.isRequired,
  getCompanyByUserId: PropTypes.func.isRequired,
  createClients: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
  company: state.company,
});

export default connect(mapStateToProps, {
  getMenuById,
  getCompanyByUserId,
  createClients,
})(ClientForm);
