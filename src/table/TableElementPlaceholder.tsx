import * as React from 'react'

interface TableElementPlaceholderProps {
    // лучше не забывать про , или ;
    // или настроить линтер, чтобы он не давал забывать
    height: number
}

export const TableElementPlaceholder = ({height}: TableElementPlaceholderProps) => {
    // переменная не имеет ничего общего с классами
    const styleClass = {
        height: height
    };

    // элемент слишком узкого назначения -- он выполняет свою роль только если в случае, если используется в определенном родителе
    // а значит мог бы быть частью родителя
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
