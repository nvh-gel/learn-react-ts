import React from "react";

interface Fruit {
    id: number,
    name?: string,
}

function FruitList(props: any) {

    const fruitList = props.fruits.map((fruit: Fruit) => {
        return (<li key={fruit.id}>{fruit.name}</li>);
    });
    return (
        <div>
            <ul>{fruitList}</ul>
        </div>);
}

export default FruitList;
