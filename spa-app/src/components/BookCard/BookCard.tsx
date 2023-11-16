import styles from './bookcard.module.css';
import StarIcon from '@mui/icons-material/Star';
import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import coverPlaceholder from '../../assets/cover-placeholder.png';
import { convertTimeToMinutes } from '../../utils/formatTime';

const BookCard = ({
  details_url,
  title,
  author,
  rating,
  duration,
  cover,
}: {
  details_url: string;
  title: string;
  author: string;
  rating: string;
  duration: string;
  cover: string;
}) => {
  cover = cover == "" ? coverPlaceholder : cover;
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Link to={details_url} className={styles.card}>
        <Grid container rowSpacing={0}>
          <Grid item>
            <div className={styles.cover}>
              <img className={styles.coverImg} src={cover} alt="cover" />
            </div>
          </Grid>
          <Grid item container spacing={0} columns={{ xs: 10 }} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h5" className={styles.title}>
                {title}
              </Typography>
            </Grid>
            <Grid item container spacing={0} xs={4} justifyContent="flex-end" alignItems="center">
              <Grid item xs={0}>
                <StarIcon sx={{color: "#faaf00"}}/>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2" className={styles.ratingNum}>
                  {rating}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={0} columns={{ xs: 10 }}>
            <Grid item xs={6}>
              <Typography variant="body2" className={styles.author}>
                {author}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" className={styles.duration}>
                {convertTimeToMinutes(duration)} min
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Container>
  );
};

export default BookCard;
