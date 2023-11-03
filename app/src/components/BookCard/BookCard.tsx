import styles from "./bookcard.module.css";
import star from "../../assets/star.svg";
import { Grid } from "@mui/material";

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
  rating: number;
  duration: number;
  cover: string;
}) => {
  return (
    <a href={details_url} className={styles.card}>
      <Grid container rowSpacing={0}>
        <Grid item>
          <div className={styles.cover}>
            <img className={styles.coverImg} src={cover} alt="cover" />
          </div>
        </Grid>
        <Grid item container spacing={0} columns={{ xs: 10}} alignItems="center">
          <Grid item xs={8}>
            <p className={styles.title}>{title}</p>
          </Grid>
            <Grid item container spacing={0} xs={2} justifyContent="flex-end" alignItems="center">
                <Grid item xs={0}>
                    <img src={star} alt="star" />
                </Grid>
                <Grid item xs={1}>
                    <p className={styles.ratingNum}>{rating}</p>
                </Grid>
            </Grid>
        </Grid>
        <Grid item container spacing={0} columns={{ xs: 10}}>
          <Grid item xs={8}>
            <p className={styles.author}>{author}</p>
          </Grid>
          <Grid item xs={2}>
            <p className={styles.duration}>{duration}</p>
          </Grid>
        </Grid>
      </Grid>
    </a>
  );
};

export default BookCard;
