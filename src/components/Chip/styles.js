import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;

  background: ${({ error, isHovering }) => error ? "#F3B7BD" : isHovering ? "#EDEDED" : "none"};
  mix-blend-mode: normal;
  border-radius: 6px;
  gap: 8px;
`
export const Label = styled.span`
  font-family: SF Pro Text;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: -0.3199999928474426px;
  text-align: left;
`