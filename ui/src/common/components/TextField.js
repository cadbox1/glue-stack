import React from "react";
import TextField from "material-ui/TextField";

const CustomTextField = props => {
	return (
		<TextField
			className={props.className || "d-block"}
			margin="normal"
			InputLabelProps={{
				shrink: true,
			}}
			InputProps={{
				...props.inputProps,
				required: props.required,
			}}
			{...props}
		/>
	);
};

export default CustomTextField;
