import React, { Component, Image, Video } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Toolbar from '../toolbar/';
import {EditorWrapper, EditorContainer} from './style.js'

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      url: "",
      urlType: "",
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
  
    this.onChange = (editorState) => this.setState({ editorState });
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
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
  
  blockStyle(contentBlock){
    const type = contentBlock.getType();
      switch (type) {
        case "blockquote": return "blockquote";//edit in index.css
        case "code-block": return "code";//edit in index.css
        default:
          return null;
      }
  }

  mediaBlockRenderer(block){
    let blockVerif = block.getType() === "atomic" ? { component: this.media, editable: false } : null;
    return blockVerif;
  }

  media(){
      const state = this.state.editorState;
      const entity = state
        .getCurrentContent()
        .getEntity(state.getEntityAt(0));
        
      const { src } = entity.getData();
      const type = entity.getType();

      let media;
      if (type === "image") {
        media = <Image src={src} />;
      } else if (type === "video") {
        media = <Video src={src} />;
      }

      return media;
  }

  render() {
    return (
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
            blockStyleFn={this.blockStyle}
            blockRendererFn={this.mediaBlockRenderer}
            onChange={this.onChange}
          />
        </EditorContainer>
      </EditorWrapper>
    );
  }
}