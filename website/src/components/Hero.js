/** @jsx jsx */
import { jsx } from "theme-ui";
import { ButtonLink } from "./ButtonLink";

export const Hero = ({ children }) => (
	<section sx={{ paddingTop: 8 }}>
		<div sx={{ width: ["100%", "75%"] }}>{children}</div>
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

export const HeroButtons = ({ children }) => <div>{children}</div>;

export const HeroButton = ({ href, children }) => (
	<ButtonLink href={href}>{children}</ButtonLink>
);
