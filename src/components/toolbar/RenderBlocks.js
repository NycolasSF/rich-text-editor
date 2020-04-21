import React from "react";
import { blockTypes } from "./editorTypes";
import { ToolbarItem, Container } from "./style";
//Rich utils is a utility library for manipulating text (like inlineStyle, blockTypes...)
import { RichUtils, EditorState, AtomicBlockUtils } from "draft-js";
import { isWebUri } from 'valid-url';


export function RenderBlockStyles(props) {
    const { editorState, updateEditorState } = props;

    const applyStyle = (e, style, label) => {
        e.preventDefault();
        if(style !== 'atomic'){
            return updateEditorState(RichUtils.toggleBlockType(editorState, style));
        }else{
            return createMedia(label.toLowerCase());
        }
    };

    const createMedia = (label) => {
        const promptURL = prompt(`Paste your url of ${label}`);
       
        if (promptURL){
                      
            if (isWebUri(promptURL)){

                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    label,
                    'IMMUTABLE',
                    { src: promptURL }
                );

                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(
                    editorState,
                    { currentContent: contentStateWithEntity }
                );

                updateEditorState(AtomicBlockUtils.insertAtomicBlock(
                        newEditorState,
                        entityKey,
                        ' '
                    ));  


            }else{
                return alert('Your URL is invalid !!')
            }
        }
    }

    const isActive = (style) => {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        if (style === blockType) return true;

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