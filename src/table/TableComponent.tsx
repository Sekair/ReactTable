import * as React from "react"
import {Table} from "./Table";
import {TableElementProps} from "./TableElement";


interface TableComponentState {
    itemsBefore: TableElementProps[],
    items: TableElementProps[],
    itemsAfter: TableElementProps[],
}

// в чем разница между TableComponent и TableElement?
// как принималось решение о названии классов?
export class TableComponent extends React.Component<{}, TableComponentState> {

    // для теста ок, но эта переменная используется в методе render, ее изменение не приведет к перерисовке dom дерева
    private componentCount = 10000;

    constructor(props: {}) {
        super(props);

        // бесполезные названия переменных
        const func = this.returnHeight.bind(this);

        // можно было бы назвать items
        let tmp: TableElementProps[] = [];
        for (let i = 0; i < this.componentCount; i++) {
            tmp[i] = {
                number: i,
                // в конечном итоге передается в виде пропса компоненту, который его же и считает
                height: 0,
                text: this.randomTextGenerator(),

                // необязательно делать 10000 ссылок, достаточно было бы передавать в методе render
                // который в свою очередь не так уж обязательно было выносить в класс Table
                returnHeight: func
            }
        }
        this.state = {
            itemsBefore: [],
            items: tmp,
            itemsAfter: [],
        };
    }

    // такие вещи лучше не хранить в своем компоненте, а особенно не в нестатических свойствах
    // название похоже на французское (написано с ошибкой)
    // стоило бы дать более говорящее
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

    // так же как и эти
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
        // это не совсем прямое условие того, что посчитались все
        // если предположить, что это так, стоило бы дать этому условие говорящее имя для более простого понимания
        // + зачем заполнять в этот момент heightList? в случае ресайза он станет неактуален, но это компенсируется скроллом, вероятно скролла хватило бы и изначально
        if (number === this.componentCount - 1) {
            const total = this.state.itemsBefore.concat(this.state.items, this.state.itemsAfter);
            // вместо таких императивных конструкций лучше использовать map, на мой вкус он легче читается
            total.forEach(value => value.height = this.heightList[value.number].height);

            // по сути setState после setState
            this.setState({
                itemsBefore: total,
                items: [],
                itemsAfter: []
            });
            this.rearrangeElements();
        }
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
        // немного адок, вероятно стоило бы подумать о другой структуре данных, которая помогла бы избежать такого количества сложных операций, например сортировки на каждый скролл
        let totalList = this.state.itemsBefore.concat(this.state.items, this.state.itemsAfter) // чтобы читалось удобнее можно было бы использовать spread оператор
            .sort((a, b) => a.number < b.number ? -1 : (a.number === b.number ? 0 : 1)); // уже говорил, продублирую здесь: можно было бы написать проще

        // не совсем говорящее название, приводит к тому, что потом становится тяжко читать
        let height = 0;

        // я бы использовал reduce, но по всей видимости императивный стиль и push здесь производительнее
        for (const element of totalList) {
            if (element.height === 0) {
                after.push(element);
                continue;
            }
            // тут считается высота, а потом считается еще раз для placeholder'ов в классе table
            height += element.height;
            // стоило бы дать этим условиям названия
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
