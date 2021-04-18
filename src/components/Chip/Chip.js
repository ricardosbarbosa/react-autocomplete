import { useEventListener, useHover } from 'ahooks';
import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import CloseIcon from './assets/close.svg';
import ErrorCircleIcon from './assets/error-circle.svg'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;

  background: ${({ error, isHovering }) => error ? "#F3B7BD" : isHovering ? "#EDEDED" : "none"};
  mix-blend-mode: normal;
  border-radius: 6px;
  gap: 8px;
`
const Label = styled.span`
  font-family: SF Pro Text;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: -0.3199999928474426px;
  text-align: left;
`

function Chip({ children, error , onClose }) {
  const ref = useRef()
  const refIcon = useRef()
  const isHovering = useHover(() => ref.current);

  const handleOnClose = e => {
    e.stopPropagation(); 
    onClose(e)
  }

  useEventListener('click', handleOnClose, { target: refIcon });

  return (
    <Container error={error} isHovering={isHovering} ref={ref}>
      <Label>{children}</Label>
      
      <img
        ref={refIcon}
        onClick={handleOnClose}
        src={isHovering ? CloseIcon : !isHovering && error ? ErrorCircleIcon : null}
        alt={isHovering ? "close" : !isHovering && error ? "error" : null}
      />

    </Container>
  )
}

export default React.memo(Chip)