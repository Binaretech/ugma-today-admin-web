import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';

export function ListItemLink({ to, children }) {
    const CustomLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={CustomLink}>
                {children}
            </ListItem>
        </li>
    );
}
