import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import { EditorWrapper, EditorContainer, MyImage} from './style.js'
import Toolbar from '../toolbar';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      editorState: EditorState.createEmpty(),
      url: '',
      urlType: ''
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.updateEditor(editorState);
    
    
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleBlockStyle = this._toggleBlockStyle.bind(this);
  }

  updateEditor(editorState){
    return this.setState({ editorState })
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(
      editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }
  
  _toggleBlockStyle(contentBlock){
    const type = contentBlock.getType();
      switch (type) {
        //edit in index.css
        case "blockquote": return "blockquote";
        case "code-block": return "code";
        case "unordered-list-item" : return "list-item item-ul";
        case "ordered-list-item": return "list-item item-ol";
        case "atomic": return "atomic";
        default:
          return null;
      }
  }

  render() {
    return (
      <section>
        <EditorWrapper>
          <Toolbar
            editorState={this.state.editorState}
            updateEditorState={this.onChange}
          />
          <EditorContainer>
            <Editor
              placeholder="Enter your text ....."
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              blockStyleFn={this.toggleBlockStyle}
              blockRendererFn={mediaBlockRenderer}
              onChange={this.onChange}
              onFocus={this.onFocus}
            />
          </EditorContainer>
        </EditorWrapper>
      </section>
    );
  }
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }
  return null;
}

const Media = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const { src } = entity.getData();
  const type = entity.getType();

  if (type === 'image') {
    return <MyImage src={src} />;
  }
};