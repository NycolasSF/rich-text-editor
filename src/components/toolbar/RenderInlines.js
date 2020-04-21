import React from "react";
import { inlineTypes } from "./editorTypes";
import { ToolbarItem, Container } from "./style";
//Rich utils is a utility library for manipulating text (like inlineStyle, blockTypes...)
import { RichUtils } from "draft-js";


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