import React from "react";
import { inlineTypes, blockTypes } from "./editorTypes";
import { ToolbarItem, Container } from "./style";
//Rich utils is a utility library for manipulating text (like inlineStyle, blockTypes...)
import { RichUtils } from "draft-js";


// ? render INLINE in top and BLOCKs in bottom


export function RenderInlineStyles(props) {
  const { editorState, updateEditorState } = props;

  const applyStyle = (e, style) => {
    e.preventDefault();
    updateEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  
  const isActive = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  return (
    <Container>
      {inlineTypes.map((item, idx) => {
        return (
          <ToolbarItem
            isActive={isActive(item.style)}
            key={`${item.label}-${idx}`}
            onClick={(e) => applyStyle(e, item.style)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}


export function RenderBlockStyles(props) {
  const { editorState, updateEditorState } = props;

  const applyStyle = (e, style, label) => {
    e.preventDefault();
    if(style !== 'atomic'){
      return updateEditorState(RichUtils.toggleBlockType(editorState, style));
    }else{
      return createMedia({style: style, label: label}, updateEditorState);
    }
  };
  
  const createMedia = ({style, label}, state) => {
    const valueURL = prompt(`Paste your URL link to ${label}`);
    console.log(valueURL);
     
  }

  const isActive = (style) => {
     const selection = editorState.getSelection();
     const blockType = editorState
       .getCurrentContent()
       .getBlockForKey(selection.getStartKey())
       .getType();
      
      if(style === blockType) return true;
  
   return false;
  };

  return (
    <Container>
      {blockTypes.map((item, idx) => {
        return (
          <ToolbarItem
            isActive={isActive(item.style)}
            key={`${item.label}-${idx}`}
            onClick={(e) => applyStyle(e, item.style, item.label)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}