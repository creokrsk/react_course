import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        // console.log(e);
        onChange({ name, value: !value });
    };

    const getInputClasses = () => {
        return "form-check-label" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-4">
            <input
                type="checkbox"
                className="form-check-input"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className={getInputClasses()} htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default CheckBoxField;
