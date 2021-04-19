import styled from 'styled-components'

export const Container = styled.div`
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
export const Select = styled.div`
  overflow-y: auto;
  max-height: 267px;
  width: 100%;
  overflow-y: scroll;
  background: white;
  line-height: 20px;
  text-align: center; 
  
`
export const Option = styled.div`
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
export const LoadingOption = styled(Option)`
  margin-bottom: 20px;
`