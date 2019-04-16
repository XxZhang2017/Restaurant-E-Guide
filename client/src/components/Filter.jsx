import React, { Component } from 'react'
import PropTypes from 'prop-types';

const FilterBox = ({ type = 'checkbox', name, checked = false, onChange }) =>
( <input type={type} name={name} checked={checked} onChange={onChange}  />
  );

FilterBox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}


export default FilterBox