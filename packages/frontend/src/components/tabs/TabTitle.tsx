import React, { ButtonHTMLAttributes, useCallback } from "react"

type Props = {
  title: string
  index: number
  setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({ title, setSelectedTab, index, ...rest }) => {

  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (<button onClick={onClick} {...rest}>{title}</button>)
}

export default TabTitle