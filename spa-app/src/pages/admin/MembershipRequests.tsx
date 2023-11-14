import React, { useState } from 'react';
import {
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  Container,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import theme from '../../theme/theme';
import Navbar from '../../components/NavBar/Navbar';
import RoundedButton from '../../components/Button/RoundedButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import placeHolder from '../../assets/cover-placeholder.png';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const data = [
  { uid: 1, username: 'user1', email: 'user1@gmail.com', requestDate: '01/01/2023', status: 0, paymentProof: '/' },
  { uid: 2, username: 'user1', email: 'user1@gmail.com', requestDate: '01/01/2023', status: 0, paymentProof: placeHolder },
];

const MembershipRequests = () => {
  const [rows, setRows] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = (id: number) => {
    setRows(
      rows.map((row) => {
        if (row.uid === id) {
          return { ...row, status: 1 };
        } else return { ...row };
      })
    );
  };
  const handleReject = (id: number) => {
    setRows(
      rows.map((row) => {
        if (row.uid === id) {
          return { ...row, status: 2 };
        } else return { ...row };
      })
    );
  };

  const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar category="admin" username="admin#placeholder" userPhoto="" />
        <Container
          component="main"
          sx={{
            width: '100%',
            margin: '100px 3%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('sm')]: {
              margin: '100px 2%',
            },
            [theme.breakpoints.up('lg')]: {
              margin: '100px 8%',
            },
          }}
        >
          <Container sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1" pt="24px">
              Membership Requests
            </Typography>
            <TableContainer component={Paper} sx={{mt: 5}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map((row) => (
                    <React.Fragment key={row.uid}>
                      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.uid}
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.requestDate}</TableCell>
                        <TableCell align='center'>
                          {
                            row.status === 1 ? <CheckIcon color= 'success'/> : row.status === 2 ? <CancelIcon color='error'/> : null
                          }
                        </TableCell>
                        <TableCell align='right'>
                          <RoundedButton
                            text={row.status === 1 ? 'Approved' : 'Approve'}
                            onClickFunction={() => {
                              handleApprove(row.uid);
                            }}
                            color='roundedButtonGreen'
                            disabled={row.status === 2|| row.status === 1}
                          />
                          <RoundedButton
                            text={row.status === 2 ? 'Rejected' : 'Reject'}
                            onClickFunction={() => {
                              handleReject(row.uid);
                            }}
                            color='roundedButtonRed'
                            disabled={row.status === 2|| row.status === 1}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={7}>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Payment Proof</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box>
                                <img src={row.paymentProof} alt={`Payment Proof for user ${row.username}`} />
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MembershipRequests;
