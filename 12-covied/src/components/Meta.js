import React from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';

const Meta = (props) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charset='utf-8' />
                <title>{props.title}</title>
                {/* SEO 태그 */}
                <meta name='description' content={props.description} />
                <meta name='keywords' content={props.keywords} />
                <meta name='author' content={props.author} />
                <meta property='og: type' content='website' />
                <meta property='og: title' content={props.title} />
                <meta property='og: description' content={props.description} />
                <meta property='og: image' content={props.image} />
                <meta property='og: url' content={props.url} />
            </Helmet>
        </HelmetProvider>
    );
};

Meta.defaultProps = {
    title: '확진자 현황',
    description: 'React.js로 구현한 Covid19 확진자 현황',
    keywords: 'React,Covid19,OpenAPI',
    author: '양수원',
    image: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/logo512.png',
    url: window.location.href
}
export default Meta;