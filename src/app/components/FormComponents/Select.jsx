import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import {
  showErrorOnChange,
  useFieldForErrors,
  ErrorMessage,
} from './Utils';

function Select(props) {
  const {
    name,
    label,
    data,
    children,
    required,
    multiple,
    helperText,
    fieldProps,
    inputLabelProps,
    formControlProps,
    formHelperTextProps,
    menuItemProps,
    showError = showErrorOnChange,
    ...restSelectProps
  } = props;

  if (!data && !children) {
    throw new Error('Please specify either children or data as an attribute.');
  }

  const { variant } = restSelectProps;
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <Field
      name={name}
      render={({
        input: {
          name: myName,
          value,
          onChange,
          ...restInput
        },
      }) => {
        // prevents an error that happens if you don't have initialValues defined in advance
        const finalValue = multiple && !value ? [] : value;
        const labelId = `select-input-${myName}`;

        return (
          <FormControl
            required={required}
            error={isError}
            fullWidth
            variant={variant}
            {...formControlProps}
          >
            {!!label && (
              <InputLabel id={labelId} {...inputLabelProps}>
                {label}
              </InputLabel>
            )}
            <MuiSelect
              name={myName}
              value={finalValue}
              onChange={onChange}
              multiple={multiple}
              label={label}
              labelId={labelId}
              inputProps={{ required, ...restInput }}
              {...restSelectProps}
            >
              {data
                ? data.map((item) => (
                  <MenuItem
                    value={item.value}
                    key={item.value}
                    disabled={item.disabled}
                    {...(menuItemProps)}
                  >
                    {item.label}
                  </MenuItem>
                ))
                : children}
            </MuiSelect>
            <ErrorMessage
              showError={isError}
              meta={field.meta}
              formHelperTextProps={formHelperTextProps}
              helperText={helperText}
            />
          </FormControl>
        );
      }}
      {...fieldProps}
    />
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  required: PropTypes.bool.isRequired,
  showError: PropTypes.func,
  children: PropTypes.shape([]),
  data: PropTypes.shape([]),
  fieldProps: PropTypes.shape({}),
  formControlProps: PropTypes.shape({}).isRequired,
  inputLabelProps: PropTypes.shape({}),
  menuItemProps: PropTypes.shape({}),
  formHelperTextProps: PropTypes.shape({}),
};

Select.defaultProps = {
  helperText: '',
  showError: showErrorOnChange,
  children: [],
  data: [],
  fieldProps: {},
  inputLabelProps: {},
  menuItemProps: {},
  formHelperTextProps: {},
};

export default Select;
