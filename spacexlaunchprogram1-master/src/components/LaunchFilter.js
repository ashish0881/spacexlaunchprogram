import React from 'react';

class LaunchFilter extends React.Component{
	constructor(props){
		super(props);
		this.state ={
		    launchSelect: '',
		};
	}

	handleLaunchClick(value){
		this.props.handleLaunchClick(value);
		this.setState({launchSelect: value});
		console.log('value is :' + value);
	}

	render(){
		return(
			<>
				<div className='success-launch-text'> Success Launch</div>
	            <div className='success-launch'>
	              <span value='true'  onClick={() => this.handleLaunchClick('true')} className={'launch-true ' + (this.state.launchSelect == 'true' ? 'selected' : '')}> True </span>
	              <span value='false' onClick={() => this.handleLaunchClick('false')} className={'launch-false ' + (this.state.launchSelect == 'false' ? 'selected' : '')}> False </span>
	            </div>
            </>
		);
	}
}

export default LaunchFilter;