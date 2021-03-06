import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import 'material-design-icons';

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
      }, 5000);
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
          <img src={props.games[state.currentIndex].background_img} alt='background' max-width='100%' height='100%'></img>
          <CarouselNav>
            <Prev >
              <Button className="material-icons" name='PREV' onClick={handleClick}>skip_previous</Button>
            </Prev>
            <Play>
              <Button className="material-icons" name='PLAY' onClick={handleClick}>play_arrow</Button>
            </Play>
            <Pause>
              <Button className="material-icons" name='PAUSE' onClick={handleClick}>pause</Button>
            </Pause>
            <Next>
              <Button className="material-icons" name='NEXT' onClick={handleClick}>skip_next</Button>
            </Next>
          </CarouselNav>
        </CarouselImg>
      </ImageContainer>
    </div>
  )
}

export default Carousel;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  color: #c0c0c0;
  font-size: 5em;
  text-shadow: 3px 3px black;
  opacity: .5;
  cursor: pointer;
`

const Play = styled.div`
  height: 90vh;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  padding-right: 4em;
`;

const Pause = styled.div`
  height: 90vh;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  padding-left: 4em;
`;

const Prev = styled.div`
  height: 5vh;
  width: 45vw;
  z-index: 2;
  display: flex;
`;

const Next = styled.div`
  height: 5vh;
  width: 45vw;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
`;

const CarouselNav = styled.div`
  height: 80vh;
  width: 95vw;
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 93vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: auto;
  overflow: hidden;
  margin: 0 auto;
  background: #333333;
  image-rendering: sharp;
`;