import Center from 'react-center';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import React, {Component} from 'react';
import {ProgressController} from '../controllers/ProgressController';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    HorizontalBarSeries,
    DiscreteColorLegend
} from "react-vis";
const sampleData = {
    positive: [{x: 'facebook', y: 22}, {x: 'blog', y: 55}],
    neutral:  [{x: 'blog', y: 55}],
    negative: [{x: 'facebook', y: 33}],
    pending:  [{x: 'blog', y: 44}],
    unassigned: [{x: 'facebook', y: 99}]
};
export class ProgressPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: sampleData,
            numberOfPostLabelledToday: null
        }
        this.controller = new ProgressController();
        this.controller.getData((err, data) => {
            this.setState({
                loading: false,
                data: err ? err : data
            });
            this.controller.getNumberOfPostLabelledToday((err, data) => {
                this.setState({numberOfPostLabelledToday : data});
            });
        });
    }
    render() {
        const BarSeries = VerticalBarSeries;
        const bars = [];
        const data = this.state.data;
        delete data.unassigned; // Because the amount of unassigned posts is too large
        for(var key in data) {
            if(data.hasOwnProperty(key)) {
                bars.push(<BarSeries data={data[key]}/>)
            }
        }
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Center>
                        <PageHeader style={{ textAlign: 'center' }}>
                            Current progress<br/>
                        </PageHeader>
                        <br/>
                    </Center>
                </div>
                {this.state.loading
                    ? "Loading . . . "
                    : (
                    <Center>
                        <XYPlot xType='ordinal' xDistance={100} width={600} height={300}>
                            <HorizontalGridLines/>
                            <VerticalGridLines/>
                            <XAxis/>
                            <YAxis/>
                            {bars}
                        </XYPlot>
                        <DiscreteColorLegend orientation="vertical" width={300} items={Object.keys(this.state.data)}/>
                    </Center>
                )}
                <div>
                    <Center>
                        {this.state.numberOfPostLabelledToday ? 
                        <h4>{`Number of post labelled today = ${this.state.numberOfPostLabelledToday}`} </h4>
                            : null}
                    </Center>
                </div>
            </div>

        )
    }
}