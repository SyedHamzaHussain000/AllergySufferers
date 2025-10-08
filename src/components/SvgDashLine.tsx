import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Line } from 'react-native-svg'

const SvgDashLine = () => {
  return (
           <Svg height={22} width="100%">
            <Line
              x1="0"
              y1="10"
              x2="100%"
              y2="10"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeDasharray="5,5" // <--- DASHED pattern: 5 units dash, 5 units gap
            />
          </Svg>
  )
}

export default SvgDashLine