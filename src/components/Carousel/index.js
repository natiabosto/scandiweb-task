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
    
    .slide_content {
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

const Carousel = ({
    content = [],
    fit = 'cover',
    arrowSize = 70,
    arrowColor = 'rgb(224 224 224)',
    arrowPosition = { top: '40%', side: '3%' },
    loop = true
}) => {

    if (content.length === 0) return (
        <div>
            No content to show
        </div>
    )

    const [state, setState] = React.useState({
        previous: content.length >= 3 ? content.length - 1 : 0,
        current: 0,
        next: content.length >= 2 ? 1 : 0
    });

    const handleRotate = (e) => {

        if (!loop && !((state.current + e) >= 0 && (state.current + e) <= content.length - 1)) return;

        const toBeSet = e === 1 ?
            {
                previous: state.current,
                current: state.next,
                next: state.next + 1 === content.length ? 0 : state.next + 1
            }
            :
            {
                previous: state.previous - 1 < 0 ? content.length - 1 : state.previous - 1,
                current: state.previous,
                next: state.current
            }

        setState(toBeSet)
    }

    const handlePrevious = () => {
        handleRotate(-1);
    }

    const handleNext = () => {
        handleRotate(1);
    }

    const hasLeft = React.useMemo(() => {

        if (!loop && state.current === 0) return false;

        return true
    }, [loop, state.current])

    const hasRight = React.useMemo(() => {

        if (!loop && state.current === content.length - 1) return false;

        return true
    }, [loop, state.current])

    const ArrowLeft = hasLeft && (
        <div className='arrow-left__container' onClick={handlePrevious}>
            <div className='arrow-left__top-div'></div>
            <div className='arrow-left__bottom-div'></div>
        </div>
    )

    const ArrowRight = hasRight && (
        <div className='arrow-right__container' onClick={handleNext}>
            <div className='arrow-right__top-div'></div>
            <div className='arrow-right__bottom-div'></div>
        </div>
    )

    const contentData = content[0].url ?
        (
            <Wrapper fit={fit} arrowSize={arrowSize} arrowColor={arrowColor} arrowPosition={arrowPosition}>
                { ArrowLeft}
                <div className='slide__previous'> <img src={content[state.previous].url} alt='alt' className='slide_content' /> </div>
                <div className='slide__current'> <img src={content[state.current].url} alt='alt' className='slide_content' /> </div>
                <div className='slide__next'> <img src={content[state.next].url} alt='alt' className='slide_content' /> </div>
                { ArrowRight}
            </Wrapper>
        )
        :
        (
            <Wrapper fit={fit} arrowSize={arrowSize} arrowColor={arrowColor} arrowPosition={arrowPosition}>
                { ArrowLeft}
                <div className='slide__previous'> <div className='slide_content'> {content[state.previous].html} </div></div>
                <div className='slide__current'> <div className='slide_content'> {content[state.current].html} </div></div>
                <div className='slide__next'> <div className='slide_content'> {content[state.next].html} </div></div>
                { ArrowRight}
            </Wrapper>
        )

    return contentData
}

export default Carousel;