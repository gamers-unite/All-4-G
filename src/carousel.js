import React, {useEffect, useReducer} from 'react';

//HOOKS AND REDUCER

Carousel = () => {
    let [state, dispatch] = useReducer(
        (state, action)=>{
            switch(action.type){
                case 'PROGRESS':
                case 'NEXT':
                return{
                    ...state, playing: action.type === 'PROGRESS',
                    currentIndex: (state.currentIndex + 1) % games.length
                }
                case 'PREV':
                return{
                    ...state, playing: false,
                    currentIndex: (state.currentIndex - 1 + games.length) % games.length
                }
                case 'PLAY':
                return{
                    ...state, playing: true, takeFocus: false
                }
                case 'PAUSE':
                return{
                    ...state, playing: false
                }
                case 'GOTO':
                return{
                    ...state, currentIndex: action.index
                }
                default: return state
            }
        },{currentIndex: 0, playing: false}
    )


    useEffect(()=>{
        if(state.playing){
            let timeout = setTimeout(()=>{
                dispatch({type: 'PROGRESS'})
            }, SLIDE_DURATION);
            return () => clearTimeout(timeout)
        }
    }, [state.currentIndex, state.playing]);

    return(
        <Carousel>
            <Games>
            {games.map((image, index)=>(
                <Game
                key={index}
                id={`image${index}`}
                image={games.img}
                title={games.title}
                current={index === state.currentIndex}
                info={gmaes.info}
                />
            ))}
            </Games>
        
            <GameNav>
                {games.map((games, index)=>
                <GameItem
                    key={index}
                    current={index === state.currentIndex}
                    onClick={()=>{dispatch({type: 'GOTO', index})}}
                    />
                )}
            </GameNav>
    
            <Nav>
                <button className= 'Play'>
                    onclick={()=>{dispatch({type: 'PLAY'})}}
                </button>

                <button className= 'Pause'>
                    onclick={()=>{dispatch({type: 'PAUSE'})}}
                </button>

                <button className= 'Prev'>
                    onClick={()=>{dispatch({type: 'PREV'})}}
                </button>

                <button className= 'Next'>
                    onClick={()=>{dispatch({type: 'NEXT'})}}
                </button>
            </Nav>
        </Carousel>
    )
}