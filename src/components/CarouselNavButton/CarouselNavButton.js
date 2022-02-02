import React, { useState, useRef } from 'react';
import style from './CarouselNavButton.module.scss';

export const CarouselNavButton = ({left, disabled, onButtonClick = () => {}}) => {
    return (
        <div className={`${style.wrapper} ${disabled ? style.disabled : ''} ${left ? style.leftArrow : ''}`} onClick={onButtonClick}>
            <img className={`${style.navButton}`} src={require('../../assets/images/arrow.png')} />
        </div>
    )
}