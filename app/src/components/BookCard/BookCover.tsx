import styles from "./bookcard.module.css";

const BookCover = ({
  cover,
}: {
  cover: string;
}) => {
  return (
    <div className={styles.cover}>
      <img className={styles.coverImg} src={cover} alt="cover" />
    </div>
  );
};

export default BookCover;
