import uuid from 'node-uuid';
import BaseStore from './BaseStore.js';
import LaneActions from '../actions/LaneActions.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import NoteStore from './NoteStore.js';
import update from 'react-addons-update';

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
        this.update(action.id, action.name, action.editing);
        this.emitChange();
        break;
      case "DELETE_LANE":
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;
      case "ATTACH_TO_NEW_LANE":
        console.log(action);
        this.attachToNewLane(action.laneId, noteId);
        this.emitChange();
        break;
      case "MOVE_NOTE":
        console.log(action);
        this.move(action.sourceId, action.targetId);
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

  update(id, name) {
    const lanes = this.lanes.map(lane => {
      const laneName = lane.name;
      if(lane.id === id) {
        lane.name = name;
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

  move(sourceId, targetId) {
    const lanes = this.lanes;
    console.log(targetId);
    const sourceLane = lanes.filter(lane => {
      return lane.notes.indexOf(sourceId) >= 0;
    })[0];
    const targetLane = lanes.filter(lane => {
      return lane.notes.indexOf(targetId) >= 0;
    })[0];

    const lane = NoteStore.lane;
    const notes = lane.notes;
    this.lanes.forEach(lane => {
      Object.keys(lane).forEach(notes => {
        lane.notes.forEach(note => {
          console.log(note);
          console.log(targetId);
          if(note === targetId) {
            lane.notes.splice(lane.notes.indexOf(targetId), 0, sourceId);
          }
        })
      })
    })

    /*for(let lane in this.lanes){
      console.log(lane);
      for(let notes in lane){
        if(lane.hasOwnProperty(notes)){
          console.log(lane.notes[notes]);
          notes.forEach(targetId => {
            if(note.id === targetId) {
              lane.notes.splice(lane.notes.indexOf(targetId), 0, sourceId);
            }
          })
        }
      }
    }*/

    /*const sourceNoteIndex = sourceLane.lane.indexOf(sourceId);
    const targetNoteIndex = sourceLane.lane.indexOf(targetId);

    if(sourceLane === targetLane) {
      //move at once to avoid complications
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });
    }
    else {
      //get rid of the sourceLane
      sourceLane.notes.splice(sourceNoteIndex, 1);
      //and move it to target
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }
    */

    return lanes;
  }

}

export default new LaneStore();
