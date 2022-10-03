import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import Animation, { BOTTOM_TOP, SCALE_ZOOM } from 'src/components/Animation';
import Image from 'src/components/Image';
import { isEven } from 'src/utils/isEven';
import styles from './Articles.module.css';

const mk = classNames.bind(styles);

export default function ArticleItem({ article, index }) {
  console.log('delete me in ArticleItem');
  const ArticleText = ({ article }) => {
    return (
      <Animation scroll variant={BOTTOM_TOP} className={mk('article-text')}>
        <h2
          className={mk('article-title font-primary font-bold text-32-px leading-10 text-primary')}
        >
          {article.title}
        </h2>
        <p>{article.content}</p>
      </Animation>
    );
  };

  const ArticleImage = ({ article }) => {
    return (
      <Animation scroll variant={SCALE_ZOOM}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          width={548}
          height={383}
          objectFit="cover"
          placeholder="blur"
          className={mk('article-image')}
        />
      </Animation>
    );
  };

  const array = [<ArticleText article={article} />, <ArticleImage article={article} />];

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={mk('article-wrapper')}
    >
      {isEven(index) ? array : array.reverse()}
    </motion.article>
  );
}
