import React, {SyntheticEvent} from "react";
import {Button} from "antd";

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {

    currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {

    state = {currentEnthusiasm: this.props.enthusiasmLevel || 1};

    onIncrement = (event: SyntheticEvent) => {
        console.log(event);
        this.updateEnthusiasm(1);
    }

    onDecrement = (event: SyntheticEvent) => {
        console.log(event.target);
        this.updateEnthusiasm(-1);
    }

    render() {
        const {name} = this.props;
        if (this.state.currentEnthusiasm < 1) {
            throw new Error("Be more enthusiastic!");
        }
        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMark(this.state.currentEnthusiasm)}
                </div>
                <Button onClick={this.onIncrement}>+</Button>
                <Button onClick={this.onDecrement}>-</Button>
            </div>
        );
    }

    updateEnthusiasm(change: number) {
        this.setState((currentState) => {
            return {currentEnthusiasm: currentState.currentEnthusiasm + change};
        })
    }
}

function getExclamationMark(numChar: number) {
    return Array(numChar + 1).join("!")
}

export default Hello;
