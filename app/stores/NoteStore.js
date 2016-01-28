import uuid from 'node-uuid';
import BaseStore from './BaseStore.js';
import NoteActions from '../actions/NoteActions.js';
import LaneStore from '../stores/LaneStore.js';

let CHANGE_EVENT = 'change';

class NoteStore extends BaseStore{
  constructor() {
    super();

    this.subscribe(() => this._registerToActions.bind(this));
    this.notes = [];
  }

  _registerToActions(action) {
    switch(action.action) {
      case "CREATE_NOTE":
        console.log(action);
        this.create();
        this.emitChange();
        break;
      case "UPDATE_NOTE":
        //this causes every lane should do the same shit, i think
        console.log(action);
        this.update(action.id.id, action.id.task);
        this.emitChange();
        break;
      case "DELETE_NOTE":
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;
    }
  }

  create() {
    //create a note which contains id and task
    //const lanes = LaneStore.lanes;
    const note = {
      id: uuid.v4(),
      task: "New Task"
    };
    this.notes.push(note);
    return note;
  }

  update(id, task) {
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
