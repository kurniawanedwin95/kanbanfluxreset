import React from 'react';
import Note from './Note.js';
import Editable from './Editable.js';
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
      editing: props.lane.editing,
      sourceId: props.lane.sourceId,
      targetId: props.lane.targetId,
      notes: props.lane.notes
    };
  }

  componentDidMount() {
    NoteStore.addChangeListener(this.noteStoreChanged);
    LaneStore.addChangeListener(this.laneStoreChanged);
  }

  componentWillUnmount() {
    NoteStore.removeChangeListener(this.noteStoreChanged);
    LaneStore.removeChangeListener(this.laneStoreChanged);
  }

  noteStoreChanged = () => {
    this.setState({lane: NoteStore.lane});
  };

  laneStoreChanged = () => {
    this.setState({name: this.props.lane.name});
  };

  render() {
    //lane is undefined, note is undefined, nothing is defined here
    //const lanes = LaneStore.lanes;
    const lane = NoteStore.lane;
    const laneId = this.state.id;
    const laneName = this.state.name;
    const sourceId = this.state.sourceId;
    const targetId = this.state.targetId;
    const editState = this.state.editing;
    const notes = this.state.notes;
    const renderedNotes = [];

    lane.forEach(note => {
      notes.forEach(noteId => {
        if(note.id === noteId) {
          renderedNotes.push(
            <li className="note" key={note.id}>
              {/*<Editable
                editing={editState}
                value={note.task}
                onValueClick={this.onValueClick.bind(this, note.id)}
                onEdit={this.editNote.bind(this, note.id)}
                onDelete={this.deleteNote.bind(this, laneId, note.id)} />*/}
              <Note
                id={note.id}
                task={note.task}
                onEdit={this.editNote.bind(this, note.id)}
                onDelete={this.deleteNote.bind(this, laneId, note.id)}
                onMove={this.moveNote.bind(this, sourceId, targetId)} />
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

          <Editable className="lane-name" editing={editState}
            value={laneName} onClick={this.activateLaneEdit.bind(this, laneId)}
            onEdit = {this.editName.bind(this, laneId)} />
          <div className="lane-delete">
            <button onClick={this.deleteLane.bind(this, laneId)}>x</button>
          </div>
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

  deleteNote(laneId, noteId) {
    NoteActions.delete(laneId, noteId);
  }

  moveNote(sourceId, targetId) {
    LaneActions.moveNote(sourceId, targetId);
  }

  editName(id, name) {
    this.setState({editing: false});
    const editing = false;
    LaneActions.update(editing, id, name);
  }

  activateLaneEdit(id) {
    this.setState({editing: true});
    const editing = true;
    LaneActions.update(editing, id);
  }

  deleteLane(id) {
    LaneActions.delete(id);
  }

  onValueClick(id) {

  }

}

export default Lane;
