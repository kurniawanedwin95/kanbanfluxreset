import uuid from 'node-uuid';
import BaseStore from './BaseStore.js';
import LaneActions from '../actions/LaneActions.js';

let CHANGE_EVENT = 'change';

class LaneStore extends BaseStore {
  constructor() {
    super();

    this.subscribe(() => this._registerToActions.bind(this));
    this.lanes = [];
  }

  _registerToActions(action) {
    switch(action.action){
      case "CREATE_LANE":
        console.log(action);
        this.create();
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
        this.attachToLane(action.id, action.id.id);
        this.emitChange();

    }
  }

  create() {
    const lane = {
      id: uuid.v4(),
      name: 'New Lane',
      notes: []//lane.notes || []
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
          console.warn('Already attached note to lane', lanes);
        }
      }
      return lane;
    });
  }

}

export default new LaneStore();
