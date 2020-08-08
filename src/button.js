import {Component} from 'react';

class Button extends Component{

	constructor(props){
		super(props);
		this.className = props.className;
		this.text = props.text;
		this.onClick = props.onClick;
	}
}

export default Button;