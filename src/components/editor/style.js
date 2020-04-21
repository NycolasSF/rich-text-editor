import styled from "styled-components";

export const EditorWrapper = styled.div`
  min-width: 700px;
  max-width: 700px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3em;
`;
export const EditorContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 9em;
  border-radius: 5px;
  background-color: #fff;
  padding: 5px;
  font-size: 17px;
  font-weight: 300;
  box-shadow: 0px 2px 8px -3px rgba(0,0,0,0.75);
`;

export const MyImage = styled.img`
  display:  inline-block;
  max-width: 50%;
`;