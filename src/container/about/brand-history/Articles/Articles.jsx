import classNames from 'classnames/bind';

import { articles } from '../brand-history-config';
import ArticleItem from './ArticleItem';
import styles from './Articles.module.css';

const mk = classNames.bind(styles);

export default function Articles() {
  return (
    <section className={mk('articles')}>
      <ul className={mk('article-list')}>
        {articles.map((article, index) => (
          <li key={index}>
            <ArticleItem article={article} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}
