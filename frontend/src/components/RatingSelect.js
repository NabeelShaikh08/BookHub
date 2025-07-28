import React from 'react';
import PropTypes from 'prop-types';
import './Components.css';

/**
 * RatingSelect component for selecting review ratings
 * @param {number} value - Current rating value
 * @param {function} onChange - Callback function when rating changes
 * @param {string} name - Input name for accessibility
 */
const RatingSelect = ({ value, onChange, name = "rating" }) => {
  const ratings = [
    { value: 5, label: "5 - Excellent" },
    { value: 4, label: "4 - Very Good" },
    { value: 3, label: "3 - Good" },
    { value: 2, label: "2 - Fair" },
    { value: 1, label: "1 - Poor" },
  ];

  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="rating-select"
      aria-label="Select rating"
    >
      {ratings.map((rating) => (
        <option key={rating.value} value={rating.value}>
          {rating.label}
        </option>
      ))}
    </select>
  );
};

RatingSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default RatingSelect;
