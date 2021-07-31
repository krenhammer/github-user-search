import { useLink } from "react-aria";
import { useRef } from 'react'
import React from "react";

export const AccessibleAnchor: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {
    let ref = useRef<HTMLAnchorElement>(null);
    let {linkProps} = useLink(props, ref);
    
    return (
        <a className="cursor-pointer" {...props} {...{ ref }} {...linkProps}>{props.children}</a>
    );
}

export default AccessibleAnchor;
