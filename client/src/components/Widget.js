import React from 'react';
import Draggable from 'react-draggable';

const Widget = () => (
    <Draggable >
        <div id="widgetContain">
            <div id="widgetScale">
                <canvas id="widget">
                </canvas>
            </div>
        </div>
    </Draggable>
)


export default Widget;