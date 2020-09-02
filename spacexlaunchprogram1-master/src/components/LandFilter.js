import React from 'react';

class LandFilter extends React.Component{
	constructor(props){
		super(props);
		this.state ={
		    landSelect: '',
		};
	}

	handleLandClick(value){
		this.props.handleLandClick(value);
		this.setState({landSelect: value});
		console.log('Landing value is :' + value);
	}

	render(){
		return(
			<>
				<div className='success-landing-text'> Successful Landing</div>
	            <div className='success-landing'>
	              <span value='true'  onClick={() => this.handleLandClick('true')} className={'landing-true-false ' + (this.state.landSelect == 'true' ? 'selected' : '')}> True </span>
	              <span value='false' onClick={() => this.handleLandClick('false')} className={'landing-true-false ' + (this.state.landSelect == 'false' ? 'selected' : '')}> False </span>
	            </div>
            </>
		);
	}
}

export default LandFilter;