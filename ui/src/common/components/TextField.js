import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({ inputProps, dBlock = true, ...props }) => {
	return (
		<TextField
			style={dBlock ? { display: "block" } : undefined}
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
