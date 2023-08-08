import { CirclesWithBar } from 'react-loader-spinner';
import css from '../styles.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
      />
    </div>
  );
};

