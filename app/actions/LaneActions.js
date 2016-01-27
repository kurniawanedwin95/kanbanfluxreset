import AppDispatcher from '../dispatcher/AppDispatcher.js';
import KanbanConstants from '../constants/KanbanConstants.js';

class LaneActions {
  create() {
    AppDispatcher.dispatch({
      action: KanbanConstants.CREATE_LANE,
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

  attachToLane(noteId, laneId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.ATTACH_TO_LANE,
      //noteId: noteId,
      //laneId: laneId
    });
  }

  detachFromLane(noteId, laneId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.DETACH_FROM_LANE,
    });
  }

  moveLane(noteId, laneId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.MOVE_LANE,
    });
  }

}

export default new LaneActions();
