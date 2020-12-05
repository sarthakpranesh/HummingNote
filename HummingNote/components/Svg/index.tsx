import React from 'react';
import { SvgProps } from "react-native-svg"

export type CustomSvgType = {
    name: string,
    isFilled?: boolean,
    cusColor?: string,
} & SvgProps;

const CustomSvg = (props: CustomSvgType) => {
    let SVG;
    switch (props.name) {
        case "Star":
            SVG = require("./Star").default;
            break;
        case "Back":
            SVG = require("./Back").default;
            break;
        case "Cross":
            SVG = require("./Cross").default;
            break;
        case "Drop":
            SVG = require("./Drop").default;
            break;
        case "Edit":
            SVG = require("./Edit").default;
            break;
        case "Plus":
            SVG = require("./Plus").default;
            break;
        case "Save":
            SVG = require("./Save").default;
            break;
        case "Delete":
            SVG = require("./Delete").default;
            break;
        default:
            SVG = require("./Star").default;
    }
    
    let color = props.color;
    if (props.cusColor) {
        color = props.cusColor;
    }
    
    let fill = props.fill;
    if (props.isFilled) {
        fill = color;
    }
    return <SVG {...props} color={color} fill={fill} />
}

export default CustomSvg;