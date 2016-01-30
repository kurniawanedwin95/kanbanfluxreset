import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import KanbanConstants from '../constants/KanbanConstants.js';

class NoteActions {
  create(laneId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.CREATE_NOTE,
      id: uuid.v4(),
      task: "New Task",
      laneId: laneId
    });
  }

  update(id, task) {
    AppDispatcher.dispatch({
      action: KanbanConstants.UPDATE_NOTE,
      id: id,
      task: task
    });
  }

  delete(laneId, noteId) {
    AppDispatcher.dispatch({
      action: KanbanConstants.DELETE_NOTE,
      laneId: laneId,
      noteId: noteId
    });
  }

}

export default new NoteActions();
