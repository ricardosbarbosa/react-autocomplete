import React from 'react'
import { Container, LoadingOption, Select, Option } from './styles'

const DropDown = React.forwardRef(({ onClick, options, loading, loadingMore, noMore, loadMore }, ref) => {
  return (
    <Container >
      <Select ref={ref}>
        {/* loading */}
        {(!options?.length && !noMore)&& (<LoadingOption>Loading...</LoadingOption>)}
        {/* options */}
        {options?.map(option => <Option key={option} onClick={() => onClick(option)} >{option}</Option>)}
        {/* no data */}
        {noMore && <LoadingOption>No e-mail to show</LoadingOption>}
        {/* load more */}
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