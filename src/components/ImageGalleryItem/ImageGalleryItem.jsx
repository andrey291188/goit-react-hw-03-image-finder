import css from '../styles.module.css';

export const ImageGalleryItem = ({data, onClick}) => {
    return (
          data.map(({ id, largeImageURL, tags }, index) => (
            <li className={css.ImageGalleryItem} key={id}>
                <img
                  src={largeImageURL}
                  alt={tags}
                  className={css.ImageGalleryItem_image}
                  onClick={() => onClick(index)}
                />
            </li>
          ))
    );
  }



