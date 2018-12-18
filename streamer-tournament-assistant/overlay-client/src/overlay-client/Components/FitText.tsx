import * as React from "react";
import fitty from "fitty";

export interface IProps {
    minSize?: number;
    maxSize?: number;
    multiLine?: boolean;
}

class FitText extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public componentWillMount() {
        var fit = fitty(".component-fitText", {
            minSize: this.props.minSize,
            maxSize: this.props.maxSize,
            multiLine: this.props.multiLine
        });
    }

    public render() {
        return (
            <div className={`component-fitText`}>
                {this.props.children}
            </div>
        );
    }
}

export default FitText;
