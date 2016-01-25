import AppDispatcher from '../dispatcher/AppDispatcher.js';
import KanbanConstants from '../constants/KanbanConstants.js';

class NoteActions {
  create() {
    AppDispatcher.dispatch({
      action: KanbanConstants.CREATE_NOTE,
    });
  }

  update(id, task) {
    AppDispatcher.dispatch({
      action: KanbanConstants.UPDATE_NOTE,
      id: id,
      task: task
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: KanbanConstants.DELETE_NOTE,
      id: id
    });
  }

}

export default new NoteActions();
