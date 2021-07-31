import { useLink } from "react-aria";
import { useRef } from 'react'
import React from "react";
import { Link, LinkProps } from 'react-router-dom';

export const AccessibleRouterLink: React.FC<LinkProps & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {
    let ref = useRef<HTMLAnchorElement>(null);
    let {linkProps} = useLink(props, ref);
    
    return (
        <Link {...{ ref, to: props.to }} {...linkProps}>{props.children}</Link>
    );
}

export default AccessibleRouterLink;
