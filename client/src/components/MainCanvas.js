import React, { Component } from 'react';
import Coord from './Coord';
import { Container, Form, Grid, Message, Transition } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { ChromePicker } from 'react-color';
import io from 'socket.io-client';

const remoteURL = "https://whispering-crag-56456.herokuapp.com";

const socket = io.connect(process.env.NODE_ENV === "production" ? remoteURL : "http://localhost:3001");

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
    pickerColor: '',
    xCheck: true,
    yCheck: true,
    rCheck: true,
    gCheck: true,
    bCheck: true,
    errorHidden: true,
    successHidden: true
  }

  componentDidMount() {
    //////////////////////widge///////////////////////////////

    ////////////////////canvas//////////////////////////


    socket.on('message', data => {
      let coord = data.data.coord.split('.')[1];
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
    c.rect(0, 0, 1000, 800);
    c.fillStyle = "white";
    c.fill();


    ///////////////////////widget////////////////////////////////////////
    let widgetScale = document.getElementById('widgetScale');

    widgetScale.style = "transform: scale(25, 25)";


    let widget = document.getElementById('widget');


    let widgetc = widget.getContext('2d');

    widget.width = "7";
    widget.height = "7";

    widget.style = "border: 1px solid black";

    widgetc.beginPath();
    widgetc.rect(0, 0, 7, 7);
    widgetc.fillStyle = "white";
    widgetc.fill();


    widget.addEventListener("mouseover", e => {
      e.preventDefault();
      widget.style.cursor = "move";
    })


    //////////////////////////api////////////////////////////////////

    axios.get('/api/canvas').then(res => {
      for (let pixel in res.data.pixels) {
        let coord = pixel.toString().split('-');
        let xcoord = parseInt(coord[0]);
        let ycoord = parseInt(coord[1]);
        let color = res.data.pixels[pixel];
        let red = color[0];
        let green = color[1];
        let blue = color[2];

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

    canvas.addEventListener('mouseover', e => {
      e.preventDefault();
      canvas.style.cursor = "crosshair";
    })

    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      if (e.deltaY < 0) {
        if (this.state.currScale < 20) {
          this.setState({
            currScale: this.state.currScale + 1
          }, () => {
            let container = document.getElementById('containment');
            scaleDiv.style = `transform: scale(${this.state.currScale},${this.state.currScale})`;
            container.scroll(this.state.chx * (this.state.currScale - 1), this.state.chy * (this.state.currScale - 1));
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
            container.scroll(this.state.chx * (this.state.currScale - 1), this.state.chy * (this.state.currScale - 1));
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
        curry: curry,
        formx: currx,
        formy: curry
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

    let x = this.state.currx - 4;
    let y = this.state.curry - 4;

    if (x <= 1) {
      x = 1;
    }

    if (x >= 992) {
      x = 992
    }

    if (y <= 1) {
      y = 1;
    }

    if (y >= 792) {
      y = 792
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
  }

  formClick = (e) => {
    e.preventDefault();
    let x = this.state.formx;
    let y = this.state.formy;
    let r = this.state.formr;
    let g = this.state.formg;
    let b = this.state.formb;

    let xCheck = (Number.isInteger(parseInt(x)) && parseInt(x) >= 1 && parseInt(x) <= 1000);
    let yCheck = (Number.isInteger(parseInt(y)) && parseInt(y) >= 1 && parseInt(y) <= 800);
    let rCheck = (parseInt(r) >= 0 && parseInt(r) <= 255);
    let gCheck = (parseInt(g) >= 0 && parseInt(g) <= 255);
    let bCheck = (parseInt(b) >= 0 && parseInt(b) <= 255);

    if (xCheck && yCheck && rCheck && gCheck && bCheck) {

      let coord = "pixels." + x + "-" + y;
      let rgb = [parseInt(r), parseInt(g), parseInt(b)];
      this.setState({
        xCheck: xCheck,
        yCheck: yCheck,
        rCheck: rCheck,
        gCheck: gCheck,
        bCheck: bCheck,
        errorHidden: true,
        successHidden: false
      }, () => {
        setTimeout(() => {
          this.setState({
            successHidden: true
          })
        }, 3000)
      });

      axios.put('/api/canvas', {
        coord: coord,
        rgb: rgb
      }).then(response => {
        if (response.status === 200) {
          socket.emit('pixel', response);
        }

      }).catch(err => {
        console.log(err);
      });
    } else {
      this.setState({
        xCheck: xCheck,
        yCheck: yCheck,
        rCheck: rCheck,
        gCheck: gCheck,
        bCheck: bCheck,
        errorHidden: false,
        successHidden: true
      })
    }
  }

  handleChangeComplete = (color) => {
    this.setState({
      pickerColor: color
    }, () => {
      this.setState({
        formr: this.state.pickerColor.rgb.r,
        formg: this.state.pickerColor.rgb.g,
        formb: this.state.pickerColor.rgb.b
      })
    });
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
          <Grid.Column className="bottomRow">
            <Grid>
              <Grid.Column width={10}>
                <Coord currx={this.state.currx} curry={this.state.curry} chx={this.state.chx} chy={this.state.chy} />
                <Transition visible={!this.state.errorHidden} animation='scale' duration={500}>
                  {<Message className="message" negative>{!this.state.xCheck ? <p>Invalid X coordinate</p> : console.log()}
                    {!this.state.yCheck ? <p>Invalid Y coordinate</p> : console.log()}
                    {!this.state.rCheck ? <p>Invalid Red Input</p> : console.log()}
                    {!this.state.gCheck ? <p>Invalid Green Input</p> : console.log()}
                    {!this.state.bCheck ? <p>Invalid Blue Input</p> : console.log()}</Message>}
                </Transition>
                <Transition visible={!this.state.successHidden} animation='scale' duration={500}>
                  <Message className="message" positive>Success!</Message>
                </Transition>

                <Form>
                  <Form.Group widths="equal">
                    <Form.Input placeholder="1-1000" value={this.state.formx} fluid onChange={this.formChange} name="formx" label="X coordinate" />
                    <Form.Input placeholder="1-800" value={this.state.formy} fluid onChange={this.formChange} name="formy" label="Y coordinate" />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input placeholder="1-255" value={this.state.formr} fluid onChange={this.formChange} name="formr" label="Red" />
                    <Form.Input placeholder="1-255" value={this.state.formg} fluid onChange={this.formChange} name="formg" label="Green" />
                    <Form.Input placeholder="1-255" value={this.state.formb} fluid onChange={this.formChange} name="formb" label="Blue" />
                  </Form.Group>
                  <Form.Button onClick={this.formClick}>Submit</Form.Button>
                </Form>
              </Grid.Column>
              <Grid.Column width={6}>
                <ChromePicker color={this.state.pickerColor} onChange={this.handleChangeComplete} disableAlpha={true} />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default MainCanvas;