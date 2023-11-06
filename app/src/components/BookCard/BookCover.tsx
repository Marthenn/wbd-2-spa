import styles from "./bookcard.module.css";
import coverPlaceholder from '../../assets/cover-placeholder.png';

const BookCover = ({
  cover,
}: {
  cover: string;
}) => {
  cover = cover == "" ? coverPlaceholder : cover;
  return (
    <div className={styles.cover}>
      <img className={styles.coverImg} src={cover} alt="cover" />
    </div>
  );
};

export default BookCover;
