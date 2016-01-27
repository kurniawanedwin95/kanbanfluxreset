import React from 'react';

import Lanes from './Lanes.js';
import LaneActions from '../actions/LaneActions.js';
import LaneStore from '../stores/LaneStore.js';
//import NoteStore from '../stores/NoteStore.js';

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    LaneStore.addChangeListener(this.storeChanged);
    //NoteStore.addChangeListener(this.storeChanged);
  }

  componentWillUnmount() {
    LaneStore.removeChangeListener(this.storeChanged);
    //NoteStore.removeChangeListener(this.storeChanged);
  }
  //setState works but produces:
  //Warning: setState(...): You passed an undefined or null state object; instead, use forceUpdate().
  storeChanged = (lanes) => {
    this.forceUpdate(lanes);
  };

  render () {
    const lanes = LaneStore.lanes;
    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <Lanes
          lanes={lanes}/>
      </div>
    );
  }

  addLane() {
    LaneActions.create();
  }

}

export default App;
