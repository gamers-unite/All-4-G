import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Request from './Request';
import {findByTestAttr, checkProps} from '../../test/testUtils'; 

configure({ adapter: new Adapter() })

const wrapper = shallow (<Request />);

test('render without error', () => {
    const component = findByTestAttr(wrapper, 'creator-info')
    expect(component.length).toBe(0)
})



// props = {id: 1, creatorName: 'Rich'}


// describe('Request Properties:',()=>{
//     test('Request default as an empty array', ()=>{
//         expect(Array.isArray(request)).toEqual(true);
//         expect(request.length).toEqual(1);
//     });

//     test('Team should default to 1', ()=>{
//         expect(Array.isArray(team)).toEqual(true);
//         expect(team.length).toEqual(1);
//     });
// });

// describe('Team Methods:', ()=>{
//     afterEach=()=>{
//         request = [];
//         team= [];
//     };

//     test('renderTeam() should add a user to the team array.', ()=>{
//         Request.renderTeam(request[0]);
//         Request.renderTeam(request[1]);

//         expect(request.length).toEqual(2);
//         expect( request[0] ).toEqual
//     })

// })