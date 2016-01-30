import React from 'react';
import Note from './Note.js';
import NoteActions from '../actions/NoteActions.js';
import NoteStore from '../stores/NoteStore.js';
import LaneActions from '../actions/LaneActions.js';
import LaneStore from '../stores/LaneStore.js';
import Lanes from './Lanes.js';

class Lane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lane: [],
      id: props.lane.id,
      name: props.lane.name,
      notes: props.lane.notes
    };
  }

  componentDidMount() {
    NoteStore.addChangeListener(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.removeChangeListener(this.storeChanged);
  }

  storeChanged = () => {
    this.setState({lane: NoteStore.lane});
  };

  render() {
    //lane is undefined, note is undefined, nothing is defined here
    //const lanes = LaneStore.lanes;
    const lane = NoteStore.lane;
    const laneId = this.state.id;
    const notes = this.state.notes;
    const renderedNotes = [];

    lane.forEach(note => {
      notes.forEach(noteId => {
        if(note.id === noteId) {
          renderedNotes.push(
            <li className="note" key={note.id}>
              <Note
                task={note.task}
                onEdit={this.editNote.bind(this, note.id)}
                onDelete={this.deleteNote.bind(this, note.id)}  />
            </li>
          );
        }
      }
    )}
    );

    console.log(notes);
    return (
      <div>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, laneId)}>+</button>
          </div>
          <div className="lane-name">{this.state.name}</div>
        </div>
        <ul className="lane">
          {renderedNotes}
        </ul>
      </div>
    );
  }

  addNote(laneId) {
    NoteActions.create(laneId);
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

}

export default Lane;
