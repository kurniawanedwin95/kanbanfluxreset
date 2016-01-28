import React from 'react';
import Notes from './Notes.js';
import NoteActions from '../actions/NoteActions.js';
import NoteStore from '../stores/NoteStore.js';
import LaneActions from '../actions/LaneActions.js';
import LaneStore from '../stores/LaneStore.js';

class Lane extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NoteStore.addChangeListener(this.stateChanged);
  }

  componentWillUnmount() {
    NoteStore.removeChangeListener(this.stateChanged);
  }

  stateChanged = (notes) => {
    this.forceUpdate(notes);
  };

  render() {
    const {lane, ...props} = this.props;
    const notes = NoteStore.notes;
    return (
      <div {...props}>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, lane.id)}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <Notes
          notes={notes}
          onEdit={this.editNote.bind(this)}
          onDelete={this.deleteNote.bind(this)}/>
      </div>
    );
  }

  addNote(laneId) {
    const lanes = LaneStore.lanes;
    NoteActions.create();
    const notes = NoteStore.notes;
    LaneActions.attachToLane(laneId, notes);
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

}

export default Lane;
