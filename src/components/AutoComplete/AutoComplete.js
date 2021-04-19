import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Chip } from '../Chip'
import { useClickAway, useCounter, useDynamicList, useEventListener, useRequest } from 'ahooks'
import { validateEmail } from '../../utils/email'
import { InputContainer, Input } from './styles'
import { DropDown } from '../DropDown'

const useRequestOptions = {
  paginated: true,
  manual: true,
  defaultPageSize: 5,
  debounceInterval: 1000,
  loadMore: true,
  isNoMore: (d) => (d ? d.list.length >= d.total : false),
}

export default function AutoComplete({ value: initiaValue, onChange, fetch }) {
  const ref = useRef();
  const refInput = useRef();
  const dropdownRef = useRef();
  const { list: emails, remove, getKey, push } = useDynamicList(initiaValue);
  const [value, setValue] = useState();
  const [width, setWidth] = useState(0);

  const [page, { inc, set }] = useCounter(1);

  const { loading, data, loadMore, loadingMore, noMore, reload } = useRequest(() => fetch({ q: value?.trim(), _page: page, _limit: 20 }), {
    ...useRequestOptions,
    ref: dropdownRef?.content,
    onSuccess: () => inc(),
  })

  useEffect(() => { onChange(emails) }, [emails, onChange])

  const handleInputChange = (e) => {
    setValue(e.target.value)
    set(1)
    reload()
  }
  
  const resetAutoComplete = () => {
    refInput.current.value = ""
    setWidth(0)
    setValue()
    set(1)
    reload()
  }

  useClickAway(resetAutoComplete, [ref], "click");

  const addEmail = useCallback(email => {
    if (!emails.includes(email?.trim()))
      push(email)
  }, [emails, push])

  const clickHandler = useCallback(() => { refInput.current?.focus() }, []);
  
  const keyDownHandler = useCallback((e) => {
    const includeEmail = () => {
      addEmail(value)
      setValue()
      refInput.current.value = ""
    }

    const handleTabKey = () => {
      includeEmail()
      refInput.current?.focus()
      setWidth(0)
      set(1)
    }

    const handleEnterKey = () => {
      if (value?.trim()?.length > 0) {
        includeEmail()
        reload()
      } else {
        setValue()
        refInput.current.value = ""
      }
    }
 
    if (e.code === "Tab") { handleTabKey() }
    else if (e.code === "Enter") { handleEnterKey() }

    setWidth(value?.length || 0)
  }, [addEmail, reload, set, value]);

  useEventListener('click', clickHandler, { target: ref });
  useEventListener('keydown', keyDownHandler, { target: ref });

  const dropdown = <DropDown
    ref={dropdownRef}
    options={data?.list || []}
    loading={loading}
    loadingMore={loadingMore}
    noMore={noMore}
    loadMore={loadMore}
    onClick={addEmail}
  />

  const input = <Input
    ref={refInput}
    defaultValue={value}
    placeholder={emails?.length > 0 ? "": "Placeholder..."}
    style={{ width: emails?.length > 0 ? `${width + 1}ch` : "100%" }}
    onChange={handleInputChange}
  />

  const handleChipClose = useCallback((index) => () => remove(index), [remove])

  const renderChip = (email, index) => (
    <Chip key={getKey(index)} onClose={handleChipClose(index)} error={!validateEmail(email?.trim())}>
      {email}
    </Chip>
  )

  return (
    <div ref={ref}>
      <InputContainer>
        {emails.map(renderChip)}
        {input}
      </InputContainer>
      {((document.activeElement === refInput.current)) && dropdown}
    </div>
  )
}

