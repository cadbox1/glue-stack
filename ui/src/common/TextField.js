import React from "react";
import TextField from "material-ui/TextField";

const CustomTextField = props => {
	return (
		<TextField
			className="d-block"
			inputProps={
				props.required
					? { ...props.inputProps, required: true }
					: props.inputProps
			}
			{...props}
		/>
	);
};

export default CustomTextField;
