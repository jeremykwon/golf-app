import React from 'react';

import { testVideo, testImage } from 'Asset';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const AdvertisingPage = () => {
    const images = [
        {
          original: testVideo,
          thumbnail: testImage,
        },
        {
            original: testVideo,
            thumbnail: testImage,
          },
        {
          original: testImage,
          thumbnail: testImage
        }
      ]

    return (
        <div>
            {/* <video 
                autoPlay
                muted
                onEnded={() => {console.log(111)}}
                >
                <source src={testVideo} type="video/mp4" />
            </video> */}
            <ImageGallery items={images} />
        </div>
    );
};

export default AdvertisingPage;