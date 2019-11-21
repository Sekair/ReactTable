import * as React from "react"

export interface TableElementProps {
    number: number
    height: number
    text: string
    returnHeight: (number: number, height: number) => void;
}

export const TableElement = ({number, text, height, returnHeight}: TableElementProps) => {
    let elem: HTMLTableRowElement | null;
    React.useEffect(() => {
        if (elem == null || height !== 0) {
            return;
        }
        returnHeight(number, elem.offsetHeight);
    }, [number])
    return (
        <tr key={number} ref={instance => elem = instance}>
            <td>#{number}</td>
            <td>{text}</td>
        </tr>
    )
}
