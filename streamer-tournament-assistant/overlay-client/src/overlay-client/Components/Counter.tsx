import * as React from "react";
import "./Counter.scss";
import * as odmtr from "odometer";
import "odometer/themes/odometer-theme-minimal.css";
import PopUp from "./PopUp";
import FitText from "./FitText";

export interface IProps {
    initialValue?: number;
    prefix?: string;
    suffix?: string;
}

interface IState {
    currentValue: number;
}

class Corner extends React.Component<IProps, IState> {
    odometer: any;

    constructor(props: IProps) {
        super(props);
        this.state = { currentValue: props.initialValue || 99999999999990 };
    }

    public componentDidMount() {
        setInterval(() => { this.setState({ currentValue: this.state.currentValue + Math.floor((Math.random() + 1) * 10) }) }, 10000);
    }

    public startOdometer(element: HTMLDivElement | null) {
        // I could've done this by hand but it wouldn't be that good
        if (element && !this.odometer) {
            var value = element.querySelector(".value");
            this.odometer = new odmtr({
                el: value,
                value: this.state.currentValue,
                format: '(.ddd),dd',
                theme: 'minimal',
                selector: '.value',
                duration: 5000,
            });
        }
    }

    public render() {
        return (
            <div className={`component-counter`} ref={ctx => this.startOdometer(ctx)}>
                <PopUp value={"Test"} />
                {/* Refer to https://youtu.be/JWt-dT3xZys?list=PLTEhlYdONYxv1wk2FsIpEz92X3x2E7bSx&t=257 */}
                <FitText minSize={24} maxSize={60} reFit={this.refit}>
                    <div className="value">{this.state.currentValue}</div>
                </FitText>
            </div>
        );
    }

    private refit() {

    }
}

export default Corner;
