import React from 'react';

const Coord = (props) => (
    <div id="coord">
        <p>Real Time Mouse Coordinates: x-{props.chx}, y-{props.chy}</p>
        <p>Coordinates on last click: x-{props.currx}, y-{props.curry}</p>
    </div>
)

export default Coord;