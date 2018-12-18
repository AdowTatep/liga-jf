import * as React from 'react';
import "./Overlay.scss";
import TeamScore from './TeamScore';
import Corner from './Corner';
import VerticalLayout from './VerticalLayout';
import Counter from './Counter';

class Overlay extends React.Component {
    public render() {
        return (
            <div className="component-overlay">
                <VerticalLayout top={this.getLayoutTop()} middle={this.getLayoutMiddle()} bottom={this.getLayoutBottom()} />
            </div>
        );
    }

    public getLayoutTop() {
        return (
            <div className="container-top">
                <div className={`scoreWrapper losing`}>
                    <TeamScore teamName="Time" teamNumber={1} />
                </div>
                {/* TODO: Add losing team logic */}
                <div className={`scoreWrapper`}>
                    <TeamScore teamName="Time" teamNumber={2} />
                </div>
            </div>
        );
    }

    public getLayoutMiddle() {
        return (
            <div></div>
        );
    }

    public getLayoutBottom() {
        return (
            <div>
                <Corner>
                    <Counter />
                </Corner>
            </div>
        );
    }
}

export default Overlay;
