import React from 'react';
import Draggable from 'react-draggable';

const Widget = () => (
    
        <div id="widgetContain">
            <div id="widgetScale">
            <Draggable scale={25} id="widgetDrag" >
                <canvas id="widget">
                </canvas>
            </Draggable>
            </div>
        </div>
)


export default Widget;