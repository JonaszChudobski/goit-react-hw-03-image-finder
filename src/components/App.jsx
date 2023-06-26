import React, { useState, useEffect } from 'react';
import './App.module.css';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { handleFetch } from 'api/fetchFunction';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isButton, setIsButton] = useState(null);
  const [srclarge, setSrclarge] = useState('');
  const [alt, setAlt] = useState('');

  const handlePagesAmount = () => {
    setPage(page + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements[1].value;
    setQuery(input);
    setPage(1);
    setIsButton(null);
  };

  const onClick = e => {
    const src = e.currentTarget.dataset.srclarge;
    const alt = e.currentTarget.getAttribute('alt');
    setSrclarge(src);
    setAlt(alt);
  };

  const onExitClick = () => {
    setSrclarge('');
    setAlt('');
  };

   const onExitEscape = e => {
     if (e.keyCode === 27) {
       setSrclarge('');
       setAlt('');
     }
   };

  useEffect(() => {
    const handleGet = async (query, page) => {
      if (query === '') {
        return null;
      } else {
        setIsLoading(true);
        try {
          const response = await handleFetch(query, page);
          if (page === 1) {
            setImages(response.data.hits);
            setIsButton(response.data.totalHits);
          } else {
            setImages([...images, ...response.data.hits]);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    handleGet(query, page);
    // eslint-disable-next-line
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onClick={onClick} />
      )}
      {!isLoading && isButton > 12 && page < Math.ceil(isButton / 12) ? (
        <Button onClick={handlePagesAmount} />
      ) : null}
      {srclarge ? (
        <Modal
          src={srclarge}
          alt={alt}
          onExitClick={onExitClick}
          onExitEscape={onExitEscape}
        />
      ) : null}
    </>
  );
};
