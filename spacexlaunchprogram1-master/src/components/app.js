import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCompleteList, fetchSpaceListYearFilterAll, fetchDetailsWithLaunch, fetchDetailsLandAndLaunch } from '../redux/actions'
import LaunchFilter from './LaunchFilter';
import LandFilter from './LandFilter';
import SpaceList from './SpaceList';

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      dataList:[],
      selectedYear: '',
      keyValue: '',
      launchFilter: 'false',
      landFilter: 'false'
    };
    this.dataListValue = [];

    this.renderYearList = this.renderYearList.bind(this);
    this.onLaunchClick = this.onLaunchClick.bind(this);
    this.onLandClick = this.onLandClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompleteList();
  }

  componentDidUpdate(){
    console.log('componentDidUpdate called :' + this.props.spaceListYear);
  }

  onLaunchClick(value){
    this.props.fetchDetailsWithLaunch(value);
    this.setState({launchFilter: value});
  }

  onLandClick(value){
    this.props.fetchDetailsLandAndLaunch(this.state.launchFilter, value);
    this.setState({landFilter: value});
  }

  onLaunchYearClick(year, key){
    console.log('Launch Year Clicked' + year);
    this.setState({
      selectedYear : year,
      keyValue: key
    });
    this.props.fetchSpaceListYearFilterAll(year, this.state.launchFilter, this.state.landFilter);
  }

  renderYearList(){
    console.log(this.props);
    const { isFetching, spaces } = this.props;
    const totalspaces = spaces.length;
    var uniqueYear =[];
    for(var i=0; i<spaces.length;i++){
        if(uniqueYear.indexOf(spaces[i].launch_year) === -1){
            uniqueYear.push(spaces[i].launch_year);
        }
    }
    this.dataListValue = uniqueYear.map((response,key) => {
      return (
        <span id={key} className={'launch-year' +
         (this.state.selectedYear === response ? ' selected' : '')}
         onClick={() => this.onLaunchYearClick(response, key)}>{response}</span>
        )
    });
  }

  render() {

    this.renderYearList();
    let listSpace;
    if(this.props.spaceListYear){
      listSpace = <SpaceList spaceData={this.props.spaceListYear}/>;
    }

    return (
        <div className='container'>
          <div className='title'> SpaceX Launch Programs </div>
          <div className='filter-container'>
            <div className='filter-text'>Filters</div>
            <div className='launch-text'>Launch Year</div>
            <div className='date-container'>{this.dataListValue}</div>

            <LaunchFilter handleLaunchClick={this.onLaunchClick}/>
            
            <LandFilter handleLandClick={this.onLandClick}/>

          </div>
          
          {listSpace}

        </div>
    );
  }
}
 
const mapStateToProps = (state) => {
  return {
    isFetching : state.isFetching,
    spaces : state.spaces,
    spaceListYear : state.spaceListYear
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchCompleteList : () => {
      dispatch(fetchCompleteList());
    },
    fetchSpaceListYearFilterAll : (data,launch,land) => {
      dispatch(fetchSpaceListYearFilterAll(data, launch, land));
    },
    fetchDetailsWithLaunch: (data) => {
      dispatch(fetchDetailsWithLaunch(data));
    },
    fetchDetailsLandAndLaunch: (launch,land) => {
      dispatch(fetchDetailsLandAndLaunch(launch, land));
    }
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App)
