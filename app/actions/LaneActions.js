import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import KanbanConstants from '../constants/KanbanConstants.js';

class LaneActions {
  create() {
    AppDispatcher.dispatch({
      action: KanbanConstants.CREATE_LANE,
      id: uuid.v4(),
      name: "New Lane"
    });
  }

  update() {
    AppDispatcher.dispatch({
      action: KanbanConstants.UPDATE_LANE,
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: KanbanConstants.DELETE_LANE,
    });
  }

  attachToLane(laneId, notes) {
    AppDispatcher.dispatch({
      action: KanbanConstants.ATTACH_TO_NEW_LANE,
      laneId: laneId,
      notes: notes
    });
  }

  detachFromLane(laneId, noteId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.DETACH_FROM_LANE,
    });
  }

  moveLane(laneId, noteId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.MOVE_LANE,
    });
  }

}

export default new LaneActions();
