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
      case "DELETE_NOTE":
        console.log(action);
        console.log(" in lanestore");
        this.detachFromLane(action.laneId, action.noteId);
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
        console.log(action.id);
        this.delete(action.id);
        this.emitChange();
        break;
      case "ATTACH_TO_NEW_LANE":
        console.log(action);
        this.attachToNewLane(action.laneId, noteId);
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

  delete(id) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === id) {
        const index = this.lanes.findIndex(lane => lane.id === id);
        this.lanes.splice(index, 1);
      }
      return lane;
    });
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

  detachFromLane(laneId, noteId) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === laneId) {
        lane.notes.splice(lane.notes.indexOf(noteId), 1);
      }
      return lane;
    });
  }

  attachToNewLane(laneId, noteId) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === laneId) {
        lane.notes.splice(lane.notes.indexOf(noteId), 0, noteId);
      }
      return lane;
    });
  }

}

export default new LaneStore();
