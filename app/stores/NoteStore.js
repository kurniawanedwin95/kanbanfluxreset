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
        this.update(this.notes);
        this.emitChange();
        break;
      case "DELETE_NOTE":
        this.delete(this.notes);
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
    console.log(this.notes);
    this.notes.push(note);
    return note;
  }

  update(updatedNote) {
    //not giving errors but not working either
    this.notes.map((note) => {
      if(note.id === updatedNote.id) {
        return assign({}, note, updatedNote);
      }
      return note;
    });
  }

  delete(id){
    this.notes.splice(this.notes.id, 1);
  }


}

export default new NoteStore();
