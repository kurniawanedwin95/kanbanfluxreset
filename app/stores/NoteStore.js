import uuid from 'node-uuid';
import assign from 'object-assign';
import BaseStore from './BaseStore.js';
import NoteActions from '../actions/NoteActions.js';

let CHANGE_EVENT = 'change';

class NoteStore extends BaseStore{
  constructor() {
    super();

    this.subscribe(() => this._registerToActions.bind(this));
    this.notes = [];
  }

  _registerToActions(action) {
    console.log(action);
    switch(action.action) {
      case "CREATE_NOTE":
        this.create();
        this.emitChange();
        break;
      case "UPDATE_NOTE":
        this.update(updatedNote);
        this.emitChange();
        break;
      case "DELETE_NOTE":
        this.delete(id);
        this.emitChange();
        break;
    }
  }

  create() {
    //create a note which contains id and task
    const note = {
      id: uuid.v4(),
      task: "New Task"
    };
    //const notes = this.notes;
    //note.id = uuid.v4();
    console.log(notes);
    this.notes.concat(note);
    return note;
  }

  update(updatedNote) {
  /*  const notes = this.notes.map((note) => {
      if(note.id === updatedNote.id) {
        return assign({}, note, updatedNote);
      }
      return note;
    });
    this.setState({notes});*/
  }

  delete(id){
    /*this.setState({
      notes: this.notes.filter((note) => note.id !== id)
    });*/
  }


}

export default new NoteStore();
