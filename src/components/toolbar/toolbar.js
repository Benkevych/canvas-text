import React from 'react';
import * as yup from 'yup';
import { Form, Row, Col, Badge, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { CANVAS_FONTS, CANVAS_SIZE } from '../../constants/canvas';

import './toolbar.scss';

/**
 * Returns options for font select.
 *
 * @return {ReactNode} Options for font select.
 */
const getFontOptions = () => (
  <>
    {CANVAS_FONTS.map(font => (
      <option key={font} value={font}>
        {font}
      </option>
    ))}
  </>
);

// Form validation schema
const validationSchema = yup.object({
  text: yup.string().required(),
  font: yup.string().required(),
  color: yup
    .string()
    .required()
    .matches(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  x: yup.number().required(),
  y: yup.number().required(),
  fontSize: yup.number().required(),
});

/**
 * Toolbar functional component.
 *
 * @param {Function} onSubmit: Calback function on form submit.
 */
const Toolbar = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      text: '',
      font: CANVAS_FONTS[1],
      color: '',
      x: '',
      y: '',
      fontSize: '',
    },
    onSubmit: values => {
      onSubmit({
        ...values,
        color: `#${values.color}`, // @NB: adding # to HEX color string
      });
      // formik.resetForm();
    },
    validationSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className='mt-2'>
        <Form.Group as={Col} className='text'>
          <Form.Control
            placeholder='Insert Text'
            value={formik.values.text}
            isInvalid={formik.touched.text && formik.errors.text}
            onChange={e => {
              if (e.target.value.length <= 50) {
                // @NB: checking if input value length is less then 50 symbols
                formik.setFieldValue('text', e.target.value);
              }
            }}
          />
          <Badge pill className='badge' variant={formik.values.text.length === 50 ? 'danger' : 'secondary'}>
            {`${formik.values.text.length}/50`}
          </Badge>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            as='select'
            value={formik.values.font}
            isInvalid={formik.touched.font && formik.errors.font}
            onChange={e => formik.setFieldValue('font', e.target.value)}>
            {getFontOptions()}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>#</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder='HEX color'
              value={formik.values.color}
              isInvalid={formik.touched.color && formik.errors.color}
              onChange={e => {
                if (e.target.value.length <= 6) {
                  formik.setFieldValue('color', e.target.value);
                }
              }}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}>
          <InputGroup>
            <Form.Control
              type='number'
              min='0'
              max={CANVAS_SIZE.width}
              placeholder='X'
              value={formik.values.x}
              isInvalid={formik.touched.x && formik.errors.x}
              onChange={e => formik.setFieldValue('x', e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text>px</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}>
          <InputGroup>
            <Form.Control
              type='number'
              min='0'
              max={CANVAS_SIZE.height}
              placeholder='Y'
              value={formik.values.y}
              isInvalid={formik.touched.y && formik.errors.y}
              onChange={e => formik.setFieldValue('y', e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text>px</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}>
          <InputGroup>
            <Form.Control
              type='number'
              min='0'
              max='32'
              placeholder='Size'
              value={formik.values.fontSize}
              isInvalid={formik.touched.fontSize && formik.errors.fontSize}
              onChange={e => formik.setFieldValue('fontSize', e.target.value)}
            />
            <InputGroup.Append>
              <InputGroup.Text>px</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default Toolbar;
