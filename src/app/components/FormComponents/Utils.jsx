import React from 'react';
import { useField } from 'react-final-form';
import { FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true,
  },
};

export function ErrorMessage({
  showError,
  meta,
  formHelperTextProps,
  helperText,
}) {
  if (showError) {
    return <FormHelperText {...formHelperTextProps}>{meta.error || meta.submitError}</FormHelperText>;
  } if (helperText) {
    return <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>;
  }
}
export const showErrorOnChange = ({
  meta: {
    submitError, dirtySinceLastSubmit, error, touched, modified,
  },
}) => !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));

export const useFieldForErrors = (name) => useField(name, config);

ErrorMessage.propTypes = {
  showError: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    submitError: PropTypes.func.isRequired,
  }).isRequired,
  formHelperTextProps: PropTypes.shape({}).isRequired,
};
