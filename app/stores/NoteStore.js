import uuid from 'node-uuid';
import BaseStore from './BaseStore.js';
import NoteActions from '../actions/NoteActions.js';
import LaneStore from '../stores/LaneStore.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

let CHANGE_EVENT = 'change';

class NoteStore extends BaseStore{
  constructor() {
    super();

    this.subscribe(() => this._registerToActions.bind(this));
    this.lane = [];
  }

  _registerToActions(action) {
    switch(action.action) {
      case "CREATE_NOTE":
        console.log(action);
        this.create(action.id, action.task);
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
        AppDispatcher.waitFor([LaneStore.dispatchToken]);
        this.delete(action.noteId);
        this.emitChange();
        break;
    }
  }

  create(id, task) {
    //create a note which contains id and task
    //const lanes = LaneStore.lanes;
    const note = {
      id: id,
      task: task
    };
    this.lane.push(note);
    return note;
  }

  update(id, task) {
    console.log(id);
    this.lane.map((note) => {
      if(note.id === id) {
        note.task = task;
      }
    });
  }

  delete(id){
    this.lane.map((note, index) => {
      if(note.id === id) {
        this.lane.splice(index, 1);
      };
    })
  }


}

export default new NoteStore();
