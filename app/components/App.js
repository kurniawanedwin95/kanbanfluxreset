import React from 'react';

import Notes from './Notes.js'
import NoteActions from '../actions/NoteActions.js';
import NoteStore from '../stores/NoteStore.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(NoteActions);
    //const notes = NoteStore.notes;
    //this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.addChangeListener(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.removeChangeListener(this.storeChanged);
  }
  //setState works but produces:
  //Warning: setState(...): You passed an undefined or null state object; instead, use forceUpdate().
  storeChanged = (notes) => {
    this.forceUpdate(notes);
  };

  render () {
    const notes = NoteStore.notes;
    console.log(NoteStore);
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}/>
      </div>
    );
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

  addNote() {
    NoteActions.create({task: 'New Task'});
  }

  editNote(id) {
    NoteActions.update(id);
  }
}

export default App;
