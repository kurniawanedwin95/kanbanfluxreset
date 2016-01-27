import React from 'react';
import Notes from './Notes.js';
import NoteActions from '../actions/NoteActions.js';
import NoteStore from '../stores/NoteStore.js';

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
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <Notes
          notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}/>
      </div>
    );
  }

  addNote() {
    NoteActions.create();
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

}

export default Lane;
