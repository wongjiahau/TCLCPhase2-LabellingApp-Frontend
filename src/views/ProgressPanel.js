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
            data: sampleData
        }
        this.controller = new ProgressController('English');
        return;
        this
            .controller
            .getData((err, data) => {
                this.setState({
                    loading: false,
                    data: err
                        ? err
                        : data.body
                });
            });
    }
    render() {
        const BarSeries = VerticalBarSeries;
        const bars = [];
        const data = this.state.data;
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
                    {this.state.loading
                        ? "Loading . . . "
                        : JSON.stringify(this.state.data)}
                </div>
                <Center>
                    <XYPlot xType='ordinal' xDistance={100} width={300} height={300}>
                        <HorizontalGridLines/>
                        <VerticalGridLines/>
                        <XAxis/>
                        <YAxis/>
                        {bars}
                    </XYPlot>
                    <DiscreteColorLegend orientation="vertical" width={300} items={Object.keys(this.state.data)}/>
                </Center>
            </div>

        )
    }
}