import React from "react";
import MaterialTextField from "@material-ui/core/TextField";

const TextField = ({
	InputProps,
	InputLabelProps,
	dBlock = true,
	...props
}) => {
	return (
		<MaterialTextField
			style={dBlock ? { display: "block" } : undefined}
			margin="normal"
			InputLabelProps={{
				...InputLabelProps,
				shrink: true,
			}}
			InputProps={{
				...InputProps,
				required: props.required,
			}}
			{...props}
		/>
	);
};

export { TextField };
