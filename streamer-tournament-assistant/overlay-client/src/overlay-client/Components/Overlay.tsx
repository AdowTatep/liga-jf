import * as React from 'react';
import TeamScore from './TeamScore';
import "./Overlay.scss";

class Overlay extends React.Component {
    public render() {
        return (
            <div className="component-overlay">
                <div className="container">
                    <div className={`scoreWrapper losing`}>
                        <TeamScore teamName="Time" teamNumber={1} />
                    </div>
                    {/* TODO: Add losing team logic */}
                    <div className={`scoreWrapper`}>
                        <TeamScore teamName="Time" teamNumber={2} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Overlay;
