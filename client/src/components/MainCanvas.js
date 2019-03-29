import React, { Component } from 'react';
import Widget from './Widget';
import Coord from './Coord';
import { Container, Form, Grid } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { ChromePicker } from 'react-color';
import io from 'socket.io-client';

const remoteURL = "https://whispering-crag-56456.herokuapp.com";

const socket = io.connect( process.env.NODE_ENV === "production" ? remoteURL : "http://localhost:3001");

class MainCanvas extends Component {

  state = {
    mousedown: false,
    mousex: 0,
    mousey: 0,
    currScale: 1,
    currx: 0,
    curry: 0,
    widget: [],
    scrollx: 0,
    scrolly: 0,
    formx: 0,
    formy: 0,
    formr: 0,
    formg: 0,
    formb: 0,
    pickerColor: ''
  }

  componentDidMount() {
    ////////////////////canvas//////////////////////////


    socket.on('message', data => {
      console.log(data);
      let coord = data.data.coord.split('.')[1];
      console.log(coord);
      let x = coord.split('-')[0];
      let y = coord.split('-')[1];
      let color = data.data.rgb;
      let red = color[0];
      let green = color[1];
      let blue = color[2];
      
      let canvas = document.getElementById('mainCanvas');
  
      let c = canvas.getContext('2d');

      c.fillStyle = `rgb(${red},${green},${blue})`;
      c.fillRect(x - 1, y - 1, 1, 1);

      this.setWidgetColor();
    })

    let canvas = document.getElementById('mainCanvas');

    canvas.width = "1000";
    canvas.height = "800";
    canvas.style = "border: 1px solid black";

    let c = canvas.getContext('2d');

    c.beginPath();
    c.rect(1, 1, 1000, 800);
    c.fillStyle = "white";
    c.fill();


    ///////////////////////widget////////////////////////////////////////
    let widgetScale = document.getElementById('widgetScale');

    widgetScale.style = "transform: scale(18, 18)";


    let widget = document.getElementById('widget');


    let widgetc = widget.getContext('2d');

    widget.width = "7";
    widget.height = "7";

    widget.style = "border: 1px solid black";

    widgetc.beginPath();
    widgetc.rect(0, 0, 7, 7);
    widgetc.fillStyle = "white";
    widgetc.fill();



    //////////////////////////api////////////////////////////////////

    axios.get('/api/canvas').then(res => {
      console.log(res);
      for (let pixel in res.data.pixels) {
        let coord = pixel.toString().split('-');
        let xcoord = parseInt(coord[0]);
        let ycoord = parseInt(coord[1]);
        let color = res.data.pixels[pixel];
        let red = color[0];
        let green = color[1];
        let blue = color[2];

        console.log(red, green, blue);

        c.fillStyle = `rgb(${red},${green},${blue})`;
        c.fillRect(xcoord - 1, ycoord - 1, 1, 1);
      }
    })







    ////////////////////////////////////////////////////////////////////

    document.addEventListener('mouseup', e => {
      e.preventDefault();
      this.mouseup();
    });



    ////////////////////////scale div/////////////////////////////

    let container = document.getElementById('container');
    container.style = "overflow: auto";


    let scaleDiv = document.getElementById('scaleDiv');


    /////////////////////////////////////////////////////////////////


    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      if (e.deltaY < 0) {
        if (this.state.currScale < 20) {
          this.setState({
            currScale: this.state.currScale + 1
          }, () => {
            let container = document.getElementById('containment');
            // let offsetx = 1000/this.state.currScale;
            // let offsety = 800/this.state.currScale;
            scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
            container.scroll(this.state.chx * this.state.currScale, this.state.chy * this.state.currScale);
            this.setState({
              scrollx: this.state.chx * this.state.currScale,
              scrolly: this.state.chy * this.state.currScale
            });
          });
        }
        console.log('scrolling up');
      }
      if (e.deltaY > 0) {
        if (this.state.currScale > 1) {
          this.setState({
            currScale: this.state.currScale - 1
          }, () => {
            scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
            container.scroll(this.state.chx * this.state.currScale, this.state.chy * this.state.currScale);
            this.setState({
              scrollx: this.state.chx * this.state.currScale,
              scrolly: this.state.chy * this.state.currScale
            });
          });
        }
        console.log('scrolling down');
      }
    });

    canvas.addEventListener('mousedown', e => {
      let rect = e.target.getBoundingClientRect();
      let mousex = e.clientX - rect.left;
      let mousey = e.clientY - rect.top;
      this.mousedown(mousex, mousey);
    });

    canvas.addEventListener('mouseup', e => {
      this.mouseup();
    });

    canvas.addEventListener('mousemove', e => {
      let rect = e.target.getBoundingClientRect();
      let container = document.getElementById('containment');
      this.setState({
        mousex: e.clientX - rect.left,
        mousey: e.clientY - rect.top,
        chx: Math.floor((e.clientX - rect.left) / this.state.currScale),
        chy: Math.floor((e.clientY - rect.top) / this.state.currScale)
      }, () => {
        if (this.state.mousedown && this.state.currScale !== 1) {
          container.scroll(container.scrollLeft - e.movementX, container.scrollTop - e.movementY);
        }
      })
    });


    ////////////////////////////////////////////////
  }

  mousedown(mousex, mousey) {
    let currx;
    let curry;
    let scale = this.state.currScale;

    this.setState({
      mousedown: true,
      mousex: mousex,
      mousey: mousey
    }, () => {
      currx = Math.floor(this.state.mousex / scale);
      curry = Math.floor(this.state.mousey / scale);
      this.setState({
        currx: currx,
        curry: curry
      }, () => {
        this.setWidgetColor();
      })
    })
  }

  renderWidget() {
    let canvas = document.getElementById('widget');
    let c = canvas.getContext('2d');
    let index = 0;


    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        let red = this.state.widget[index];
        let green = this.state.widget[index + 1];
        let blue = this.state.widget[index + 2];
        index += 4;
        c.fillStyle = `rgb(${red},${green},${blue})`;
        c.fillRect(x, y, 1, 1);
      }
    }
  }

  setWidgetColor() {
    let canvas = document.getElementById('mainCanvas');
    let c = canvas.getContext('2d');

    let x = this.state.currx - 3;
    let y = this.state.curry - 3;

    if (x <= 1) {
      x = 1;
    }

    if (x >= 993) {
      x = 993
    }

    if (y <= 1) {
      y = 1;
    }

    if (y >= 793) {
      y = 793
    }

    let colors = c.getImageData(x, y, 7, 7).data.slice();

    this.setState({
      widget: colors
    }, () => {
      this.renderWidget();
    })
  }

  mouseup() {
    this.setState({
      mousedown: false
    })
  }

  formChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePickerChange(color, e) {
    console.log(color);
    console.log(e);
  }

  formClick = (e) => {
    e.preventDefault();
    let coord = "pixels." + this.state.formx + "-" + this.state.formy;
    let rgb = [parseInt(this.state.formr), parseInt(this.state.formg), parseInt(this.state.formb)];

    axios.put('/api/canvas', {
      coord: coord,
      rgb: rgb
    }).then(response => {
      if (response.status === 200) {
        // let canvas = document.getElementById('mainCanvas');
        // let c = canvas.getContext('2d');
        // c.fillStyle = `rgb(${parseInt(this.state.formr)}, ${parseInt(this.state.formg)}, ${parseInt(this.state.formb)})`;
        // c.fillRect(this.state.formx - 1, this.state.formy - 1, 1, 1);
        // this.setWidgetColor();
        socket.emit('pixel', response);
      }
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  handleChangeComplete = (color) => {
    this.setState({ pickerColor : color });
  }


  render() {
    return (
      <Container>
        <Grid columns={1} divided>
          <Grid.Column width={16}>
            <div id="container">
              <div className="" id="containment">
                <div className="canvasDiv" id="scaleDiv">
                  <canvas id="mainCanvas">
                  </canvas>
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column>
            <Grid>
              <Grid.Column width={10}>
                <Coord currx={this.state.currx} curry={this.state.curry} chx={this.state.chx} chy={this.state.chy} />
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input fluid onChange={this.formChange} name="formx" label="X coordinate" />
                    <Form.Input fluid onChange={this.formChange} name="formy" label="Y coordinate" />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input fluid onChange={this.formChange} name="formr" label="Red" />
                    <Form.Input fluid onChange={this.formChange} name="formg" label="Green" />
                    <Form.Input fluid onChange={this.formChange} name="formb" label="Blue" />
                  </Form.Group>
                  <Form.Button onClick={this.formClick}>Submit</Form.Button>
                </Form>
              </Grid.Column>
              <Grid.Column width={6}>
                <ChromePicker color={this.state.pickerColor} onChange={ this.handleChangeComplete } disableAlpha={true}/>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
        <Widget />
      </Container>
    );
  }
}

export default MainCanvas;