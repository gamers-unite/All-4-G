import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';


//HOOKS AND REDUCER

const Carousel = (props) => {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'PROGRESS':
        case 'NEXT':
          return {
            ...state, playing: action.type === 'PROGRESS',
            currentIndex: (state.currentIndex + 1) % props.games.length
          }
        case 'PREV':
          return {
            ...state, playing: false,
            currentIndex: (state.currentIndex - 1 + props.games.length) % props.games.length
          }
        case 'PLAY':
          return {
            ...state, playing: true, takeFocus: false
          }
        case 'PAUSE':
          return {
            ...state, playing: false
          }
        case 'GOTO':
          return {
            ...state, currentIndex: action.index
          }
        default: return state
      }
    }, { currentIndex: 0, playing: true }
  )

  useEffect(() => {
    if (state.playing) {
      let timeout = setTimeout(() => {
        dispatch({ type: 'PROGRESS' })
      }, 6000);
      return () => clearTimeout(timeout)
    }
  }, [state.currentIndex, state.playing]);

  const handleClick = (e) => {
    dispatch({ type: e.target.name })

  }
  return (
    <div>
      <ImageContainer>
          <CarouselImg>
            <img src={props.games[state.currentIndex].background_img}  max-width='100%' height='auto'>
            </img>
          </CarouselImg>
          <CarouselInfo>
            <p>{props.games[state.currentIndex].info}</p>
          </CarouselInfo>
      </ImageContainer>


      <CarouselNav>
        {/* <Play> */}
        <Button variant="contained" name='PLAY' onClick={ handleClick }>Play</Button>
        {/* </Play> */}
        <Button variant="contained" name='PAUSE' onClick={ handleClick }>Pause</Button>

        <Button variant="contained" name='PREV' onClick={ handleClick }>Prev</Button>

        <Button variant="contained" name='NEXT' onClick={ handleClick }>Next</Button>
      </CarouselNav>
    </div>
  )
}



export default Carousel;

// const Play = styled.div`
// // diplay: flex;
// // justify-content: center;
// `

const CarouselNav = styled.div`
  height: 5vh;
  width: 90vw;
  // border: 1px solid black;
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 10vh;
`;

const CarouselInfo = styled.div`
  overflow: hide;
  height: 30vh;
  width: 30vw;
  margin: 0 auto;
  z-index: 1;
  position: absolute;
  font-size: 180%;
  color: white;
  padding-bottom: 40vh;
  padding-left: 10vw;
`;

const ImageContainer = styled.div`
  // width: 99vw;
  // height 100vh;
  overflow: hidden;
  // border: 1px solid red;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // margin-left: 10vw;
  // padding-left: 10vw;
`;

const CarouselImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100vw;
  max-width: auto;
  overflow: hide;
  margin: 0 auto;
  background: #333333;
  // padding-top: 35vh;
  image-rendering: auto;
  // border: 1px solid red;
  // z-index: -1;
`;