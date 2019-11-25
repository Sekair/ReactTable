// в соседнем файле используются одинарные кавычки в импорте, стоило бы регламентировать
import * as React from "react"

export interface TableElementProps {
    number: number
    height: number
    text: string
    returnHeight: (number: number, height: number) => void;
}

export const TableElement = ({number, text, height, returnHeight}: TableElementProps) => {
    return (
        // number, который в данном случае скорее index стоит использовать для key с большой осторожностью
        // потенциально это ведет к проблемам с производительностью
        <tr key={number} ref={instance => {
            // запись можно было бы упростить, если поставить положительное условие, а не отрицательное
            if (instance == null || height !== 0) {
                return
            }
            // ref существует для других вещей, подобные хаки ведут к трудностям в понимании кода теми людьми, для кого код чужой
            // а значит спустя какое-то время и для самого программиста, который его писал
            returnHeight(number, instance.offsetHeight)
        }}>
            <td>#{number}</td>
            <td>{text}</td>
        </tr>
    )
}
