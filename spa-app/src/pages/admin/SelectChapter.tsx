import { useEffect, useState } from 'react';
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
  IconButton,
  Button,
} from '@mui/material';
import theme from '../../theme/theme';
import Navbar from '../../components/NavBar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { REST_BASE_URL } from '../../constants/constants';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from 'axios';
import { getToken } from '../../utils/token';

interface ChapterRow {
    chapterId: number;
    chapterName: string;
}

const SelectChapter = () => {
  const [rows, setRows] = useState<ChapterRow[]>();
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapterList = async () => {
      try {
        const response = await axios.get(`${REST_BASE_URL}api/book/details/${id}/chapternames/${page}`, {headers: {
            "Authorization": getToken()}});
        setRows(response.data.chapterDetails[0]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchChapterList();
  }, [id, page]);

  const handleChangePage = (_event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleClick = (chapterId: number) => {
    navigate(`/admin/EditTranscript/${id}/Edit/${chapterId}`)
  };

  const handleAddChapter = () => {
    navigate(`/admin/EditTranscript/${id}/Add`)
  }

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
            <Link to={`/admin/EditTranscript`}>
                <ArrowBackRoundedIcon sx={{ fontSize: 40 }} />
            </Link>
            <Typography variant="h1" pt="24px">
              Select Chapter to Edit
            </Typography>
            <TableContainer component={Paper} sx={{mt: 5}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Chapter ID</TableCell>
                    <TableCell> Chapter Title</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => (
                    <Fragment key={row.chapterId}>
                      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell  component="th" scope="row">
                          {row.chapterId}
                        </TableCell>
                        <TableCell>{row.chapterName}</TableCell>
                        <TableCell align='right'>
                        <IconButton
                            onClick={() => handleClick(row.chapterId)}
                            >
                        <EditIcon />
                        </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={rows? rows.length : 0}
              rowsPerPage={5}
              rowsPerPageOptions={[5]}
              page={page}
              onPageChange={handleChangePage}
            />
            <Button
                onClick={handleAddChapter}
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
            >
                Add Chapter
            </Button>
          </Container>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default SelectChapter;
