import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';


//HOOKS AND REDUCER

const Carousel = (props) => {
  if( props.games){
    console.log('props: ',props.games)
  }

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
    }, { currentIndex: 0, playing: false }
  )

  useEffect(() => {
    if (state.playing) {
      let timeout = setTimeout(() => {
        dispatch({ type: 'PROGRESS' })
      }, 3000);
      return () => clearTimeout(timeout)
    }
  }, [state.currentIndex, state.playing]);

  const handleClick = (e) => {
    dispatch({ type: e.target.name })
  }
  return (
    <GameWrap>
      <div>
        {/* {props.games.map((e , i)=>( */}
        <div>
          <img src={props.games[state.currentIndex].background_img}></img>
          <p>{props.games[state.currentIndex].info}</p>
          {/* // id={e.game_id}
               // image={e.background_image}
               // title={e.title}
               // current={i === state.currentIndex}
               // info={e.info} */}

        </div>
        {/* ))} */}
      </div>

      <div>
        {/* {props.games.map((e , i)=>
               <div
                   key={i}
                   current={i === state.currentIndex}
                   onClick={()=>{dispatch({type: 'GOTO', i})}}
                   />
               )} */}
      </div>

      {/* <Div name='PLAY' onClick={handleClick}> */}

      <div className='CarouselNav'>
        <button name='PLAY' onClick={ handleClick }>Play</button>

        <button name='PAUSE' onClick={ handleClick }>Pause</button>

        <button name='PREV' onClick={ handleClick }>Prev</button>

        <button name='NEXT' onClick={ handleClick }>Next</button>
      </div>
    </GameWrap>
  )
}



export default Carousel;

const GameWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  height: 92vh;
  width: 100vw;
  margin: 0 auto;
  background: #333333;
`;