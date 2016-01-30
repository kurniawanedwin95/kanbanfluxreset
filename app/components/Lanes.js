import React from 'react';
import Lane from './Lane.js';
import LaneStore from '../stores/LaneStore.js';

export default ({lanes}) => {
  return(
    <div className="lanes">{LaneStore.lanes.map(lane=>
      <Lane className="lane" key={lane.id} lane={lane} />
    )}</div>
  );
}
