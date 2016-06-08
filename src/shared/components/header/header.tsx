import * as React from "react";
import "./header";

class HeaderComponent extends React.Component<any, any> {
	constructor(props:any) {
		super(props);
	}

	render() {
		return (
			<header>
				<p className="header"> I'm the Header and I'm cool! very cool! :) </p>
			</header>
		);
	}
}

export default HeaderComponent;