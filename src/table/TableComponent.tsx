import * as React from "react"
import {Table} from "./Table";
import {TableElementProps} from "./TableElement";


interface TableComponentState {
    itemsBefore: TableElementProps[],
    items: TableElementProps[],
    itemsAfter: TableElementProps[],
}

export class TableComponent extends React.Component<{}, TableComponentState> {

    private componentCount = 10000;

    constructor(props: {}) {
        super(props);

        const func = this.returnHeight.bind(this);
        let tmp: TableElementProps[] = [];
        for (let i = 0; i < this.componentCount; i++) {
            tmp[i] = {
                number: i,
                height: 0,
                text: this.randomTextGenerator(),
                returnHeight: func
            }
        }
        this.state = {
            itemsBefore: [],
            items: tmp,
            itemsAfter: [],
        };
    }

    private firstIteratyion: string[] = [
        "Купить",
        "Получить",
        "ОРИГИНАЛЬНЫЙ",
        "Новинка",
        "Новая модель"
    ];

    private otherIteration: string[] = [
        "оригинальный",
        "XIAOMI MI ORIGINAL",
        "аккамулятор",
        "браслет для",
        "гарантия",
        "А115",
        "магнитный",
        "солнечная панель",
        "1.21 гигават"
    ];

    randomTextGenerator(): string {
        let parts: number = Math.random() * 5;
        let result: string = this.firstIteratyion[Math.floor(Math.random() * this.firstIteratyion.length)];
        for (let i = 0; i < parts; i++) {
            result += " " + this.otherIteration[Math.floor(Math.random() * this.otherIteration.length)]
        }
        return result;
    }

    private heightList: {number: number, height: number}[] = [];
    returnHeight(number: number, height: number) {
        this.heightList[number] = {
            number: number,
            height: height
        };
        if (number === this.componentCount - 1) {
            const total = this.state.itemsBefore.concat(this.state.items, this.state.itemsAfter);
            total.forEach(value => value.height = this.heightList[value.number].height);
            this.setState({
                itemsBefore: total,
                items: [],
                itemsAfter: []
            });
            this.rearrangeElements();
        }

        // const before = this.state.itemsBefore.slice();
        // for (const item of before) {
        //     if (item.number === number) {
        //         item.height = height;
        //         this.setState({
        //             itemsBefore: before
        //         });
        //         // this.rearrangeElements(this.scroll, this.clientHeight);
        //         return;
        //     }
        // }
        // const now = this.state.items.slice();
        // for (const item of now) {
        //     if (item.number === number) {
        //         item.height = height;
        //         this.setState({
        //             items: now
        //         });
        //         // this.rearrangeElements(this.scroll, this.clientHeight);
        //         return;
        //     }
        // }
        // const after = this.state.itemsAfter.slice();
        // for (const item of after) {
        //     if (item.number === number) {
        //         item.height = height;
        //         this.setState({
        //             itemsAfter: after
        //         });
        //         // this.rearrangeElements(this.scroll, this.clientHeight);
        //         return;
        //     }
        // }
    }

    private scroll: number = 0;
    private clientHeight: number = 400;

    handleTableScroll(event: React.UIEvent<HTMLTableElement>) {
        this.scroll = event.currentTarget.scrollTop;
        this.clientHeight = event.currentTarget.clientHeight;
        this.rearrangeElements();
    }

    rearrangeElements() {
        const before: TableElementProps[] = [];
        const now: TableElementProps[] = [];
        const after: TableElementProps[] = [];
        let totalList = this.state.itemsBefore.concat(this.state.items, this.state.itemsAfter)
            .sort((a, b) => a.number < b.number ? -1 : (a.number === b.number ? 0 : 1));
        let height = 0;
        for (const element of totalList) {
            if (element.height === 0) {
                after.push(element);
                continue;
            }
            height += element.height;
            if (height < this.scroll) {
                before.push(element);
            } else if (height > this.scroll && height < this.clientHeight + this.scroll) {
                now.push(element);
            } else {
                after.push(element);
            }
        }
        this.setState({
            itemsBefore: before,
            items: now,
            itemsAfter: after
        });
    }

    // processItems(items: TableElementProps[], scroll: number, height: number) {
    //     if (items.length > 0) {
    //         let beforeHeight = items.map(value => value.height)
    //             .reduce((previousValue, currentValue) => previousValue + currentValue)
    //         if (beforeHeight < scroll) {
    //             // скролл вверх, нужно выпускать элементы из before списка
    //         }
    //     }
    // }

    render() {
        return (
            <div>
                <div>Всего {this.componentCount}</div>
                <Table itemsBefore={this.state.itemsBefore}
                       items={this.state.items}
                       itemsAfter={this.state.itemsAfter}
                       tableScroll={this.handleTableScroll.bind(this)}
                />
            </div>
        )
    }


}
