import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getClients } from '../../actions/client';
import Moment from 'react-moment';

const ShowClients = ({ client: { clients, loading }, getClients }) => {
  useEffect(() => {
    if (clients) {
      getClients();
    }
  }, [getClients, clients]);

  return loading ? (
    <CircularProgress />
  ) : clients ? (
    <TableContainer component={Paper}>
      <Table
        style={{
          minWidth: 650,
        }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prenom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell align='right'>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.name}>
              <TableCell component='th' scope='row'>
                {client.lastName}
              </TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell align='right'>
                <Moment format='YYYY/MM/DD HH:mm'>{client.date}</Moment>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>Il n'y a pas encore de client enregistré</div>
  );
};

ShowClients.propTypes = {
  getClients: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  compay: state.company,
  client: state.client,
});

export default connect(mapStateToProps, {
  getClients,
})(ShowClients);
