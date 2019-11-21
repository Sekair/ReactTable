import * as React from 'react'

interface TableElementPlaceholderProps {
    height: number
}

export const TableElementPlaceholder = ({height}: TableElementPlaceholderProps) => {
    const styleClass = {
        height: height
    };
    return (
        <tr>
            <td>
                <div style={styleClass}>&nbsp;</div>
            </td>
            <td>
                <div style={styleClass}>&nbsp;</div>
            </td>
        </tr>
    );
}
