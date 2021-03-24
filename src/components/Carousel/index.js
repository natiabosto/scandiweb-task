import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px rgb(0 0 0 / 50%);
    position: relative;
    overflow: hidden;
    border-radius: 3px;

    .slide__current,
    .slide__previous,
    .slide__next {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .slide__previous {
        transform: translate(-100%)
    }

    .slide__next {
        transform: translate(100%)
    }
    
    .slide__img {
        width: 100%;
        height: 100%;
        object-fit: ${props => props.fit};
    }

    // arrows' styles
    .arrow-left__container,
    .arrow-right__container {
        width: ${props => props.arrowSize / 3 * 2}px;
        height: ${props => props.arrowSize}px;
        position: relative;
        margin-top: ${props => props.arrowPosition.top};
        z-index: 1000;
        cursor: pointer;
        border-radius: 10px;

        .arrow-left__top-div,
        .arrow-left__bottom-div,
        .arrow-right__top-div,
        .arrow-right__bottom-div {
            background-color: ${props => props.arrowColor};
            width: 65%;
            height: 10%;
            border-radius: 5px;
            position: absolute;
        }
    }

    .arrow-left__container {
        margin-left: ${props => props.arrowPosition.side};
        float: left;

        .arrow-left__top-div {
            transform: rotate( 305deg );
            top: 31%;
            left: 25%;
        }
        .arrow-left__bottom-div {
            transform: rotate( -305deg );
            top: 60%;
            left: 25%;
        }
    }

    .arrow-right__container {
        margin-right: ${props => props.arrowPosition.side};
        float: right;

        .arrow-right__top-div {
            transform: rotate( -305deg );
            top: 31%;
            left: 25%;
        }
        .arrow-right__bottom-div {
            transform: rotate( 305deg );
            top: 60%;
            left: 25%;
        }
    }

`

const Carousel = ({ images = [], fit = 'cover', arrowSize = 70, arrowColor = 'rgb(224 224 224)', arrowPosition = { top: '40%', side: '3%' } }) => {

    if (images.length === 0) return (
        <div>
            No images to show
        </div>
    )

    const [state, setState] = React.useState({
        previous: images.length >= 3 ? images.length - 1 : 0,
        current: 0,
        next: images.length >= 2 ? 1 : 0
    });

    const handleRotate = (e) => {
        
        const toBeSet = e === 1 ? 
        {
            previous: state.current,
            current: state.next,
            next: state.next + 1 === images.length ? 0 : state.next + 1
        } 
        : 
        {
            previous: state.previous - 1 < 0 ? images.length - 1 : state.previous - 1,
            current: state.previous,
            next: state.current
        }
        console.log('toBeSet', toBeSet)
        setState(toBeSet)
    }

    const handlePrevious = () => {
        handleRotate(-1);
    }

    const handleNext = () => {
        handleRotate(1);
    }

    
    const ArrowLeft = (
        <div className='arrow-left__container' onClick={handlePrevious}>
            <div className='arrow-left__top-div'></div>
            <div className='arrow-left__bottom-div'></div>
        </div>
    )
    
    const ArrowRight = (
        <div className='arrow-right__container' onClick={handleNext}>
            <div className='arrow-right__top-div'></div>
            <div className='arrow-right__bottom-div'></div>
        </div>
    )

    return (
        <Wrapper fit={fit} arrowSize={arrowSize} arrowColor={arrowColor} arrowPosition={arrowPosition}>
            { ArrowLeft }
            <div className='slide__previous'> <img src={images[state.previous].url} alt='alt' className='slide__img' /> </div>
            <div className='slide__current'> <img src={images[state.current].url} alt='alt' className='slide__img' /> </div>
            <div className='slide__next'> <img src={images[state.next].url} alt='alt' className='slide__img' /> </div>
            { ArrowRight }
        </Wrapper>
    )
}

export default Carousel;