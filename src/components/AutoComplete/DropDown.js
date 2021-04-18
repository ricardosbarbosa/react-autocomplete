import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  left: ${props => props.position}px;
  position: absolute;
  z-index: 1;
  margin: 3px;
  background: #FDFDFD;
  box-shadow: 0px 4px 14px rgba(26, 24, 24, 0.08);
  border-radius: 4px;
  width: 300px;
  max-height: 267px;
  min-width: 300px;

  height: 100%;
  padding: 7px 0px;

  ::after {
    content: '';
    height: 36px;
    width: 100%;
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, #FDFDFD 0%, #FDFDFD 50.28%, rgba(253, 253, 253, 0) 100%);
    transform: rotate(-180deg);
    border-radius: 4px 4px 0px 0px;
  } 

`
const Select = styled.div`
  overflow-y: auto;
  max-height: 267px;
  width: 100%;
  overflow-y: scroll;
  background: white;
  /* padding: 0 15px; */
  line-height: 20px;
  text-align: center; 
  
`
const Option = styled.div`
  //styleName: SF Pro Text - Body 2;
  font-family: SF Pro Text;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  
  padding: 7px 21px;
  border-radius: 0px;
  
  :hover{
    background: #EFF5F9;
  }
`
const LoadingOption = styled(Option)`
  margin-bottom: 20px;
`
const DropDown = React.forwardRef(({ onClick, options, loading, loadingMore, noMore, loadMore, position }, ref) => {
  return (
    <Container position={position} >
      <Select ref={ref}>
        {(!options?.length && !noMore)&& (
          <LoadingOption onClick={() => {}}>
            Loading...
          </LoadingOption>
        )}
        {options?.map(option => (
          <Option key={option}
            onClick={() => onClick(option)}
          >
            {option}
          </Option>
        ))}
        
        {noMore && <LoadingOption onClick={() => { }}>No e-mail to show</LoadingOption>}

        {(!noMore && options?.length > 0) && (
          <LoadingOption onClick={() => !(loading || loadingMore) && loadMore()}>
            {(loadingMore || loading) ? 'Loading...' : 'Click to load more'}
          </LoadingOption>
        )} 
      </Select>
     </Container> 
  )
})

export default DropDown