import React from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            // placeholderChar={"\u2000"}
            // keepCharPositions
            guide={false}
        />
    );
};

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default TextMaskCustom;
