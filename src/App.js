import React from 'react';
import 'App.css';
import { Carousel } from './components';
import { mockPhotos } from './constants';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 50px;
  margin-left: 400px;
  position: relative;
  width: 300px;
  height: 300px;
`

const App = () => {

  return (
    <Wrapper>
      <Carousel images={mockPhotos.landscapes} />
    </Wrapper>
  )
};

export default App;