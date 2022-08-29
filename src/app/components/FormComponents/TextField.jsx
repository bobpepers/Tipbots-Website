import React from 'react';
import {
  TextField,
} from '@mui/material';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { showErrorOnChange } from './Utils';

function TextFieldWrapper(props) {
  const {
    input: {
      name,
      value,
      type,
      onChange,
      onBlur,
      onFocus,
      ...restInput
    },
    meta,
    required,
    fullWidth = true,
    helperText,
    showError = showErrorOnChange,
    ...rest
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <TextField
      fullWidth={fullWidth}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      required={required}
      inputProps={{
        required,
        ...restInput,
      }}
      {...rest}
    />
  );
}
function TextFieldF(props) {
  const {
    name,
    type,
    fieldProps,
    ...rest
  } = props;

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => (
        <TextFieldWrapper input={input} meta={meta} name={name} type={type} {...rest} />
      )}
      {...fieldProps}
    />
  );
}

TextFieldWrapper.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.func,
  }),
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  showError: PropTypes.func,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
};

TextFieldWrapper.defaultProps = {
  required: false,
  fullWidth: false,
  showError: showErrorOnChange,
  helperText: '',
  meta: {
    error: '',
    submitError: () => null,
  },
};

TextFieldF.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  fieldProps: PropTypes.shape({}),
};

TextFieldF.defaultProps = {
  fieldProps: {},
  type: '',

};

export default TextFieldF;
