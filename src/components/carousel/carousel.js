import React, { useState, useRef } from 'react';
import { CarouselNavButton } from '../CarouselNavButton/CarouselNavButton';
import './carousel.module.scss';

import style from "./carousel.module.scss";

const data = [
    "https://wallpaperaccess.com/full/1995658.jpg",
    "https://images6.alphacoders.com/112/1126452.jpg",
    "https://c4.wallpaperflare.com/wallpaper/143/214/329/cane-corso-puppy-butterfly-gray-neapolitan-mastiff-puppy-wallpaper-preview.jpg",
    "https://pettime.net/wp-content/uploads/2021/05/Cane-Corso-1.jpg",
    "https://www.k9rl.com/wp-content/uploads/2020/04/Cane-Corsos-breed-pair-825x510.jpg"
]

export const Carousel = () => {

    let [posInPer, setPosInPer] = useState(0); 
    let [currentIndex, setCurrentIndex] = useState(0); 
    let currentPos = 0;
    const sliderRef = useRef(null);
    let _startPageX = 0;

    const onMouseDown = e => {
        console.log(' >>>> ' , e.pageX);
        _startPageX = e.pageX;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    }

    const onMouseMove = e => {
        // console.log(" >>>> ",_startPageX , e.pageX);
    }

    const onMouseUp = e => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        const diff = _startPageX - e.pageX;
        // console.log('diff ' , Math.abs(diff) , currentPos , sliderRef.current.offsetWidth)
        if( Math.abs(diff) > 100) {
            let newIndex;
            if(diff > 0) {
                newIndex = currentIndex + 1;
            } else {
                newIndex = currentIndex - 1
            }
            newIndex = Math.min(Math.max(newIndex, 0), data.length-1);
            setPosInPer( newIndex * -100);
            setCurrentIndex(newIndex);
        }
    }

    const onPrevClick = () => {
        let newIndex = currentIndex - 1;
        newIndex = Math.min(Math.max(newIndex, 0), data.length-1);
        setPosInPer( newIndex * -100);
        setCurrentIndex(newIndex);
    }

    const onNextClick = () => {
        let newIndex = currentIndex + 1;
        newIndex = Math.min(Math.max(newIndex, 0), data.length-1);
        setPosInPer( newIndex * -100);
        setCurrentIndex(newIndex);
    }

    return (
      <div className={style.wrapper}>
          <div className={style.mainWindow}>
              {/* <div className={`${style.navButton} ${style.prevButton}`}></div> */}
              <CarouselNavButton onButtonClick={onPrevClick} left={true} disabled={currentIndex <= 0}></CarouselNavButton>
              <ul ref={sliderRef} className={style.slider} style={{"transform":`translate3d(${posInPer}%, 0px, 0px)`}} onMouseDown={onMouseDown}>
                  { 
                    data.map( (elem,index) => (
                        // <li key={`carousel_${index}`} style={{left:`${100*index}%`}} > 
                        <li key={`carousel_${index}`}> 
                            <img src={elem} />
                        </li>)
                    )}
              </ul>
              <CarouselNavButton onButtonClick={onNextClick} disabled={currentIndex >= data.length-1}></CarouselNavButton>
              {/* <div className={`${style.navButton} ${style.nextButton}`}></div> */}
          </div>
      </div>
  );
};