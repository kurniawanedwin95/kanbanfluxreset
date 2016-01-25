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
        this.update(action.id, action.task);
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
      task: "New Task"
    };
    console.log(this.notes);
    this.notes.push(note);
    return note;
  }

  update(id, task) {
    //assign isnt working yet
    console.log(id);
    this.notes.map((note) => {
      if(note.id === id) {
        note.task = task;
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
