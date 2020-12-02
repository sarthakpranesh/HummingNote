import React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Drop = (props: SvgProps) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={props.fill}
      {...props}
    >
      <Path
        d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Drop;
