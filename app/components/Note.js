import React from 'react';

import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

//obviously props.id wouldn't work...

const noteSource = {
  beginDrag(props) {
    return{
      id: props.id
    };
  },
  isDragging(props, monitor) {
    console.log(props.id);
    return props.id === monitor.getItem().id;
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    console.log(`source: ${sourceId}, target: ${targetId}`);
    //WE NEED TO GET SOURCEID AND TARGETID
    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
//do something with render
class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      editing: false,
      sourceId: null,
      targetId: null
    };
  }

  render() {
    if(this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }

  renderEdit = () => {
    //Deal with blur and input handlers. These map to DOM events.
    console.log(this.props.id);

    return <input type="text"
      autoFocus={true}
      placeholder={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };

  renderNote = () => {
    console.log(noteTarget);
    //If the user clicks a normal note, trigger editing logic.
    const onDelete = this.props.onDelete;
    const {connectDragSource, connectDropTarget, isDragging, onMove, id, ...props} = this.props;


    return connectDragSource(connectDropTarget(
      <div style={{opacity: isDragging ? 0 : 1}}onClick={this.edit}>
        <span className="task">{this.props.task}</span>
      {/*<div {...props}>{props.children}</div>*/}
        {onDelete ? this.renderDelete() : null }
      </div>
    ));
  };

  renderDelete = () => {
    return <button className="delete-note" onClick={this.props.onDelete}>x</button>;
  };

  edit = () => {
    //Enter edit mode.
    this.setState({
      editing: true
    });
  };

  checkEnter = (e) => {
    //The user hits "enter", finish edit
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    //'Note' will trigger an optional 'onEdit' callback once it
    //has a new value. We will use this to communicate the change to
    //'App'.
    //
    //A smarter way to deal with the default value would be to setState
    //it through 'defaultProps'.
    //
    //See *Typing with React* chapter for more information.
    if(this.props.onEdit) {
      this.props.onEdit(e.target.value);
    }
    this.setState({
      editing: false
    });
  };

}

export default Note;
