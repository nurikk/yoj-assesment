import React, { ReactElement, useState } from "react"
import './Tabs.css';
import TabTitle from "./TabTitle"

type Props = {
  children: ReactElement[]
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            className={index === selectedTab ? "active" : ""}
          />
        ))}
      </div>
      {children[selectedTab]}
    </div>
  )
}

export default Tabs