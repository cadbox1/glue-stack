/** @jsx jsx */
import { jsx } from "theme-ui";
import { ButtonLink } from "./ButtonLink";

export const Hero = ({ children }) => (
	<section sx={{ paddingTop: 8 }}>
		<div sx={{ width: ["100%", "70%"] }}>{children}</div>
	</section>
);

export const HeroHeading = ({ children }) => (
	<h1
		sx={{
			fontSize: "3rem",
			fontWeight: "normal",
			lineHeight: 1.2,
			mt: 0,
			mb: 2,
		}}
	>
		{children}
	</h1>
);

export const HeroLead = ({ children }) => (
	<p sx={{ mt: 0, mb: 2 }}>{children}</p>
);

const heroButtonMargin = 2;

export const HeroButtons = ({ children }) => (
	<div sx={{ mx: -heroButtonMargin }}>{children}</div>
);

export const HeroButton = ({ href, children, ...props }) => (
	<ButtonLink href={href} sx={{ mx: heroButtonMargin }} {...props}>
		{children}
	</ButtonLink>
);
