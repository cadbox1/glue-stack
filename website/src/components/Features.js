import React from "react";
import styled from "@emotion/styled";

export const Features = ({ children }) => (
	<section className="py-8 py-md-11 border-bottom">
		<div className="container">
			<div className="row">{children}</div>
		</div>
	</section>
);

const FeatureStyled = styled("div")`
	padding-top: 6rem;
	padding-bottom: 6rem;
`;

export const Feature = ({ children }) => (
	<FeatureStyled className="col-12 col-md-4">{children}</FeatureStyled>
);

export const FeatureHeading = ({ children }) => <h4>{children}</h4>;

export const FeatureText = ({ children }) => (
	<p className="mb-6 mb-md-0">{children}</p>
);
