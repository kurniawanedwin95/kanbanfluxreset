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

  update(editing, id, name) {
    AppDispatcher.dispatch({
      action: KanbanConstants.UPDATE_LANE,
      id: id,
      name: name,
      editing: editing
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: KanbanConstants.DELETE_LANE,
      id: id
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

  moveNote(sourceId, targetId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.MOVE_NOTE,
      sourceId: sourceId,
      targetId: targetId
    });
  }

}

export default new LaneActions();
