import React from "react";
import styled from "@emotion/styled";
import { ButtonLink } from "./ButtonLink";

const HeroStyled = styled("section")`
	padding-top: 6rem;
`;

export const Hero = ({ children }) => (
	<HeroStyled>
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-9">{children}</div>
			</div>
		</div>
	</HeroStyled>
);

export const HeroHeading = ({ children }) => (
	<h1 className="display-4">{children}</h1>
);

const HeroLeadStyled = styled("p")`
	margin-bottom: 2rem;
`;

export const HeroLead = ({ children }) => (
	<HeroLeadStyled>{children}</HeroLeadStyled>
);

export const HeroButtons = ({ children }) => <div>{children}</div>;

export const HeroButton = ({ href, children }) => (
	<ButtonLink href={href}>{children}</ButtonLink>
);
