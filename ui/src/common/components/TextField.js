import React from "react";
import MaterialTextField from "@material-ui/core/TextField";

const TextField = ({ InputProps, dBlock = true, ...props }) => {
	return (
		<MaterialTextField
			style={dBlock ? { display: "block" } : undefined}
			margin="normal"
			InputLabelProps={{
				...props.InputLabelProps,
				shrink: true,
			}}
			InputProps={{
				...props.InputProps,
				required: props.required,
			}}
			{...props}
		/>
	);
};

export { TextField };
