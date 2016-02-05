import React from 'react';

import Lanes from './Lanes.js';
import LaneActions from '../actions/LaneActions.js';
import LaneStore from '../stores/LaneStore.js';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lanes: [],
      id: null
    };
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
  storeChanged = () => {
    this.setState({lanes: LaneStore.lanes})
  };

  render () {
    let lanes = this.state.lanes;
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
