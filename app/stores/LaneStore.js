import uuid from 'node-uuid';
import BaseStore from './BaseStore.js';
import LaneActions from '../actions/LaneActions.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import NoteStore from './NoteStore.js';

let CHANGE_EVENT = 'change';

class LaneStore extends BaseStore {
  constructor() {
    super();

    this.subscribe(() => this._registerToActions.bind(this));
    this.lanes = [];
  }

  _registerToActions(action) {
    switch(action.action){
      case "CREATE_NOTE":
        console.log(action);
        console.log(" in lanestore");
        AppDispatcher.waitFor([NoteStore.dispatchToken]);
        this.attachToLane(action.laneId, action.id);
        this.emitChange();
        break;
      case "CREATE_LANE":
        console.log(action);
        this.create(action.id, action.name);
        this.emitChange();
        break;
      case "UPDATE_LANE":
        console.log(action);
        break;
      case "DELETE_LANE":
        console.log(action);
        break;
      case "ATTACH_TO_LANE":
        console.log(action);
        this.attachToLane(action.laneId, noteId);
        this.emitChange();
        break;
    }
  }

  create(id, name) {
    const lane = {
      id: id,
      name: name,
      notes: []
    };
    this.lanes.push(lane);
    console.log(`laneId: ${lane.id}`);
    return lane;
  }

  attachToLane(laneId, noteId) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === laneId) {
        if(lane.notes.indexOf(noteId) === -1) {
          lane.notes.push(noteId);
        }
        else {
          console.warn('Already attached note to lane', lane);
        }
      }
      return lane;
    });
  }

}

export default new LaneStore();
