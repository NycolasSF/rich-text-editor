import styled from "styled-components";

export const ToolbarItem = styled.div`
  width: 28px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  background-color: #3E34C2;
  color: #fff;
  font-size: 16px;
  font-family: Oxygen, sans-serif;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    `
    transform: translateY(1px);
    color: #AF2A66;
    background-color: transparent;
    border: 1px solid #34495e;`}
  &:hover {
    transform: translateY(1px);
    color: #AD0551;
    background-color: transparent;
    border: 1px solid #34495e;
  }
`;

export const Container = styled.div`
  display: flex;
  margin-right: 7px;
`;
