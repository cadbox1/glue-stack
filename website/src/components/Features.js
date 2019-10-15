/** @jsx jsx */
import { jsx } from "theme-ui";

const featurePadding = 3;

export const Features = ({ children }) => (
	<section
		sx={{ display: "flex", flexWrap: "wrap", py: 8, mx: -featurePadding }}
	>
		{children}
	</section>
);

export const Feature = ({ children }) => (
	<div
		sx={{
			px: featurePadding,
			width: ["100%", `${(1 / 3) * 100}%`],
			marginBottom: [2, 0],
			boxSizing: "border-box",
		}}
	>
		{children}
	</div>
);

export const FeatureHeading = ({ children }) => (
	<h4 sx={{ mt: 0, mb: 2, fontSize: "24px" }}>{children}</h4>
);

export const FeatureText = ({ children }) => (
	<p sx={{ mt: 0, fontSize: "18px" }}>{children}</p>
);
