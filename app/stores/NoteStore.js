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
        this.update(action.id);
        this.emitChange();
        break;
      case "DELETE_NOTE":
        this.delete(action.id);
        this.emitChange();
        break;
    }
  }

  create() {
    //create a note which contains id and task
    const note = {
      id: uuid.v4(),
      task: `New Task ${uuid.v4()}`
    };
    console.log(this.notes);
    this.notes.push(note);
    return note;
  }

  update(id) {
    //note is undefined, doesnt get into the if loop
    console.log(id);
    //here note is undefined
    this.notes.map((note) => {
      if(note.id === id) {
        console.log(note);
        console.log(note.task);
        return assign({}, note, id);
      }
    });
  }

  delete(id){
    this.notes.map((note, index) => {
      if(note.id === id) {
        this.notes.splice(index, 1);
      };
    })
  }


}

export default new NoteStore();
