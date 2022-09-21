import classNames from 'classnames/bind';

import Image from 'src/components/Image';
import { isEven } from 'src/utils/isEven';
import styles from './Articles.module.css';

const mk = classNames.bind(styles);

const ArticleWrapper = 'article';

export default function ArticleItem({ article, index }) {
  const ArticleText = ({ article }) => {
    return (
      <div className={mk('article-text')}>
        <h2
          className={mk('article-title font-primary font-bold text-32-px leading-10 text-primary')}
        >
          {article.title}
        </h2>
        <p>{article.content}</p>
      </div>
    );
  };

  const ArticleImage = ({ article }) => {
    return (
      <Image
        src={article.image.src}
        alt={article.image.alt}
        width={548}
        height={383}
        objectFit="cover"
        placeholder="blur"
        className={mk('article-image')}
      />
    );
  };

  const array = [<ArticleText article={article} />, <ArticleImage article={article} />];

  return (
    <ArticleWrapper className={mk('article-wrapper')}>
      {isEven(index) ? array : array.reverse()}
    </ArticleWrapper>
  );
}
