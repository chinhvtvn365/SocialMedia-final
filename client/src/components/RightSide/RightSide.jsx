import React from 'react'
import "./RightSide.css"
import { TrendData } from '../../data/TrendData'
const RightSide = () => {
  return (
    <div className="RightSide">
        <h3>Trend for you</h3>
    <div className="RightSide-trend">
    {TrendData.map((trend, id) => {
            return(
                <div key={id} className="RightSide-trend-item">
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k shares</span>
                </div>
            )
        })}
    </div>
    <button className="RightSide-trend-button button">Share</button>
    </div>
  )
}

export default RightSide