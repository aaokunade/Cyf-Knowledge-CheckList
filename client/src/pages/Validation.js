import React from 'react';

const Validation = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required.";
  }
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid.";
  }
  if (!values.email2) {
    errors.email2 = "Email is required";
  } else if (values.email2 !== values.email) {
    errors.email2 = "Emails do not match";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 5) {
    errors.password = "Password must be more than five characters.";
  }
  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }

  return errors;
};

export default Validation;
