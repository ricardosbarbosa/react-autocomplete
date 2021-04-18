import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Chip } from '../Chip'
import { useClickAway, useCounter, useDynamicList, useEventListener, useRequest, useToggle } from 'ahooks'
import DropDown from './DropDown'

const InputContainer = styled.div`
  cursor: text;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: flex-start;
  width: 600px;
  max-width: 600px;
  min-height: 50px;
  background: #FDFDFD;
  border-radius: 8px;
  filter: drop-shadow(0px 16px 34px rgba(48, 53, 57, 0.05));
  padding: 4px 12px;
  align-items: center;
`
const Container = styled.div`
  /* display: flex;
  align-items: flex-start;
  flex-direction: column; */
`
const Input = styled.input`
  margin: 0;
  padding-left: 5px;
  background: 0 0;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  letter-spacing: 0px;
  /* color: transparent; */
  //styleName: SF Pro Text - Body 1;
  font-family: SF Pro Text;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  background-color: transparent;
  /* width: ${({ width }) => width + 1}ch; */
  width: 100%;
`

export default function AutoComplete({ value: initiaValue, onChange, fetch }) {
  const ref = useRef();
  const refInput = useRef();
  const dropdownRef = useRef();
  const { list: emails, remove, getKey, push } = useDynamicList(initiaValue);
  const [value, setValue] = useState();
  const [width, setWidth] = useState(0);
  const [showPlaceholder, { toggle }] = useToggle(true)
  // const [showDropDown, { toggle: toggleDropdown }] = useToggle(false)
  
  const [page, { inc, set }] = useCounter(1);

  const {
    loading,
    data,
    loadMore,
    loadingMore,
    noMore,
    reload
  } = useRequest(() => {
    // if (!value?.length) return []
    return fetch({
      q: value?.trim(),
      _page: page,
      _limit: 20,
    })
  }, {
    refreshDeps: [value],
    paginated: true,
    manual: true,
    defaultPageSize: 5,
    debounceInterval: 1000,
    loadMore: true,
    ref: dropdownRef?.content,
    isNoMore: (d) => (d ? d.list.length >= d.total : false),
    onSuccess: () => inc(),
  })

  useEffect(() => {
    onChange(emails)
  }, [emails, onChange])

  const handleInputChange = useCallback((e) => {
    setValue(e.target.value)
    set(1)
    reload()
  }, [reload, set])
  
  useClickAway(() => {
    setValue()
    refInput.current.value = ""
    setWidth(0)
    set(1)
    !showPlaceholder && toggle(true)
    reload()
  }, [ref], "click");

  useEffect(() => {
    !showPlaceholder && loadMore()
  }, [showPlaceholder])

  const clickHandler = useCallback((e) => {
    console.log("clickHandler")
    // setValue()
    showPlaceholder && toggle(false)
    refInput.current?.focus()
    // refInput.current.value = ""
    // setWidth(0)
    
  }, [showPlaceholder, toggle]);
  
  const handleDropdownClick = useCallback((email) => {
    if (!emails.includes(email)) push(email)
  }, [emails, push])

  const keyDownHandler = useCallback((e) => {
    if (e.code === "Tab") {
      if (!emails.includes(value)) push(value)
      setValue()
      refInput.current.value = ""
      refInput.current?.focus()
      setWidth(0)
      set(1)
      toggle(true)
    } else if (e.code === "Enter") {
      if (value?.trim()?.length > 0) {
        handleDropdownClick(value)
        // push(value)
        setValue()
        refInput.current.value = ""
        reload()
        // refInput.current?.focus()
      } else {
        setValue()
        refInput.current.value = ""
      }
    }
    setWidth(value?.length || 0)
  }, [push, set, toggle, value]);

  useEventListener('click', clickHandler, { target: ref });
  useEventListener('keydown', keyDownHandler, { target: ref });

  // useEffect(() => {
  //   const container = ref?.current
    
  //   container?.addEventListener('click', clickHandler);
  //   container?.addEventListener('keydown', keyDownHandler);

  //   return () => {
  //     container?.removeEventListener('click', clickHandler);
  //     container?.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, [ref, keyDownHandler, clickHandler]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleChipClose = useCallback((index) => () => remove(index), [remove])
  
  return (
    <Container ref={ref}>
      
      <InputContainer>
        {emails.map((email, index) => (
          <Chip key={getKey(index)} onClose={handleChipClose(index)} error={!validateEmail(email?.trim())}>
            {email}
          </Chip>
        ))}
        <Input
          ref={refInput}
          defaultValue={value}
          onChange={handleInputChange}
          width={width}
          placeholder={emails?.length > 0 ? "": "Placeholder..."}
          style={{
            width: emails?.length > 0 ? `${width + 1}ch` : "100%"
          }}
        />
      </InputContainer>

      {((!showPlaceholder)) && (
        <DropDown
          // position={refInput.current.getBoundingClientRect().left || 0}
          ref={dropdownRef}
          onClick={handleDropdownClick}
          options={data?.list || []}
          loading={loading}
          loadingMore={loadingMore}
          noMore={noMore}
          loadMore={loadMore}
        />
      )}
      
      
    </Container>
  )
}

