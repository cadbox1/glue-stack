import React from "react";
import MaterialTextField from "@material-ui/core/TextField";

const TextField = ({ inputProps, dBlock = true, ...props }) => {
	return (
		<MaterialTextField
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

export { TextField };
