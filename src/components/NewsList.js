import React from 'react';

import dayjs from 'dayjs'

import style from '../assets/scss/style.module.scss'
import noimg from '../assets/img/noimg.png'

const NewsList = ({articles}) => {

    React.useEffect(() => {
        console.log(articles);
    }, [articles]);
    
    return (
        <ul className={style.mediaList}>
            {articles.map((item, index) => (
                <li className={style.mediaItem} key={index}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                        <img src={item.urlToImage ? item.urlToImage : noimg}
                            onError= {(e) => e.currentTarget.src = noimg }
                            alt={item.mediaHeading} />
                        <h2 className={style.mediaHeading}>{item.title}</h2>
                        <p className={style.desc}>{item.description}</p>
                        <p className={style.date}>
                            {item.source && (
                                <span>{item.source.name}</span>
                            )}
                            {item.publishedAt && (
                                <span style={{ marginLeft: "10px"}}>{dayjs(item.publishedAt).format('YY/MM/DD hh:mm')}</span>
                            )}
                        </p>
                    </a>
                </li>
            ))}
            
        </ul>
    );
};

export default NewsList;