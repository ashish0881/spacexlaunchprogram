import React from 'react';

const SpaceList = (props) => {	
	return(

		<div className='space-data'>{props.spaceData.map((space,key) => {
				return(
					<div className='space-list-container'>
						<div className='rocket-details'>
							<img className='rocket-image' src={space.links.mission_patch_small} />
							<div className='text-details'>	
								<div className='space-name'> {space.rocket.rocket_name} ' #' {key}</div>
								<div className='mission-ids'> <b>Mission IDs:</b> 
									<ul>
									{space.mission_id.map(missionId => {
										return  <li> {missionId}</li>
									})}
									</ul>
								</div>
								<div className='launch-year-rocket'> <b>Launch Year:</b> {space.launch_year}</div>
								<div className='launch-success'> <b>Successful Launch:</b> {space.launch_success}</div>
								<div className='land-success'> <b>Successful Landing:</b> {space.rocket.first_stage.cores[0].land_success}</div>
							</div>
						</div>
					</div>
				)
			})

		}</div>
	);
}

export default SpaceList;