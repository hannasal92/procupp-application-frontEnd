import React from 'react';
import s from './ImageGallery.module.scss';

const images = [
  {
    src: '/templates/template0.jpg',
    label: 'template1',
  },
  {
    src: '/templates/template1.png',
    label: 'template1',
  },
  {
    src: '/templates/template2.png',
    label: 'template2',
  },
  {
    src: '/templates/template3.png',
    label: 'template3',
  },
  {
    src: '/templates/template4.png',
    label: 'template4',
  },
  {
    src: '/templates/template5.png',
    label: 'template5',
  }
];

const ImageGallery = ({showDesignToolModal}) => {
    const showDesignTool = (image) => {
        console.log(image)
        showDesignToolModal(image);
    }
    return (
        <div className={s.gallery_wrapper}>
          <h2 className={s.gallery_title}>Pick Your Template</h2>
          <div className={s.gallery_container}>
            {images.map((image, index) => (
              <div key={index} className={s.gallery_item} onClick={() => showDesignTool(image)}>
                <img src={image.src} alt={`Gallery Image ${index + 1}`} />
                <p className={s.gallery_label}>{image.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
};

export default ImageGallery;