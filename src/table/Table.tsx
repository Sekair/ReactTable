import * as React from "react"
import {TableElementPlaceholder} from "./TableElementPlaceholder";
import {TableElement, TableElementProps} from "./TableElement";

export interface TableProps {
    itemsBefore: TableElementProps[],
    items: TableElementProps[],
    itemsAfter: TableElementProps[],
    tableScroll: (event: React.UIEvent<HTMLTableElement>) => void
}

export class Table extends React.Component<TableProps, {}> {
    render() {
        const topPlaceholderHeight = this.props.itemsBefore.length === 0 ? 0 : this.props.itemsBefore
            .map(value => value.height).reduce((cal, next) => cal + next);
        const bottomPlaceholderHeight = this.props.itemsAfter.length === 0 ? 0 : this.props.itemsAfter
            .map(value => value.height).reduce((cal, next) => cal + next);
        return (
            <table onScroll={this.props.tableScroll}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Товар</th>
                </tr>
                </thead>
                <tbody>
                <TableElementPlaceholder key={-1} height={topPlaceholderHeight}/>
                {this.props.items.map((value, index) => (<TableElement key={index}
                                                                       height={value.height}
                                                                       text={value.text}
                                                                       returnHeight={value.returnHeight}
                                                                       number={value.number}/>))}
                <TableElementPlaceholder key={-2} height={bottomPlaceholderHeight}/>
                </tbody>
            </table>
        )
    }
}
