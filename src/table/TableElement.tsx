import * as React from "react"

export interface TableElementProps {
    number: number
    height: number
    text: string
    returnHeight: (number: number, height: number) => void;
}

export const TableElement = ({number, text, height, returnHeight}: TableElementProps) => {
    return (
        <tr key={number} ref={instance => {
            if (instance == null || height !== 0) {
                return
            }
            returnHeight(number, instance.offsetHeight)
        }}>
            <td>#{number}</td>
            <td>{text}</td>
        </tr>
    )
}
