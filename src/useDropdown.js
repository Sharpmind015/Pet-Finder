import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
    <div className="form-group col-md-6">
      <label htmlFor="animal" className="w-100">
        {`${label}:`}
        <select
          value={state}
          className="w-100 form-control"
          onChange={(e) => setState(e.target.value)}
          onBlur={(e) => setState(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
  return [state, setState, Dropdown];
};

export default useDropdown;
