import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { CANVAS_SIZE } from '../../constants/canvas';
import Toolbar from '../toolbar/toolbar';

const Canvas = props => {
  const canvasRef = React.useRef(null);

  const insertText = values => {
    const { text, fontSize: size, font, x, y, color } = values;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  const download = () => {
    const canvas = canvasRef.current;
    canvas.toBlob(blob => {
      let url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'image.png';
      a.click();
    });
  };

  return (
    <>
      <Toolbar onSubmit={values => insertText(values)} />
      <canvas ref={canvasRef} width={CANVAS_SIZE.width} height={CANVAS_SIZE.height} />
      <Row>
        <Col md='3'>
          <Button type='primary' onClick={e => download()}>
            Download image
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default Canvas;
