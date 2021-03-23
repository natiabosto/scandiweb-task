import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border: 3px solid red;
    width: 100%;
    height: 100%;

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

`

const Carousel = ({ images = [], fit = 'cover' }) => {

    if (images.length === 0) return (
        <div>
            No images to show
        </div>
    )

    const [state, setState] = React.useState({
        previous: 0,
        current: 0,
        next: 1
    });

    
    return (
        <Wrapper fit={fit}>
            <div className='slide__previous'> <img src={images[state.previous].url} alt='alt' className='slide__img' /> </div>
            <div className='slide__current'> <img src={images[state.current].url} alt='alt' className='slide__img' /> </div>
            <div className='slide__next'> <img src={images[state.next].url} alt='alt' className='slide__img' /> </div>
        </Wrapper>
    )
}

export default Carousel;