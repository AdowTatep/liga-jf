import * as React from "react";
import ScoreBackground from "./../Images/Score.png";
import "./TeamScore.scss";

export interface IProps {
    teamName: string;
    teamNumber: number;
    initialScore?: number;
}

interface IState {
    teamScore: number;
}

class TeamScore extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { teamScore: props.initialScore || 0 };
    }

    public render() {
        return (
            <div className={`component-teamScore`}>
                <img className="score-background" src={ScoreBackground} />
                <div className="score-content">
                    {this.getTeamOrder()}
                </div>
            </div>
        );
    }

    private getTeamOrder() {
        if (this.props.teamNumber === 1) {
            return (
                <div className="content-wrapper">
                    <p className="team-1 score">{this.state.teamScore}</p>
                    <div className="divider"></div>
                    <p className="team-1">{this.props.teamName}</p>
                </div>
            );
        } else {
            return (
                <div className="content-wrapper">
                    <p className="team-2">{this.props.teamName}</p>
                    <div className="divider"></div>
                    <p className="team-2 score">{this.state.teamScore}</p>
                </div>
            );
        }
    }
}

export default TeamScore;
