import React from 'react';
import 'App.css';
import { Carousel } from './components';
import { mockData } from './constants';
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
      <Carousel content={mockData.landscapes} />
      <br />
      <Carousel content={mockData.animals} loop={false} />
      <br />
      <Carousel content={mockData.html} arrowColor='rgb(167 167 167 / 50%)' />
    </Wrapper>
  )
};

export default App;