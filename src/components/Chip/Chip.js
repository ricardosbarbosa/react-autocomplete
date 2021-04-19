import React, { useRef } from 'react'
import { useEventListener, useHover } from 'ahooks';
import { CloseIcon, ErrorCircleIcon } from './assets';
import { Container, Label } from './styles';

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