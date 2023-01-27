
import React, { Component, img } from "react";
import Chart from 'react-apexcharts';
import { Grid } from '@material-ui/core';

class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                chart: {
                    type: 'pie'
                },
                labels: ['Peaceful', 'Safe', 'Respectful'] 

            },
            legend: {
                show: false
            },
            peaceful: this.props.peaceful,
            safe: this.props.safe,
            respectful: this.props.respectful,
            series: [this.props.peaceful, this.props.safe, this.props.respectful]

        };
    }

       
    render () {
        return (
            <Grid>
            <Grid>
                <h1>{this.state.series} Heloo</h1>
            </Grid>
            <Grid>
                <Chart options={this.state.options}
                       series={[0,1,2]}
                       type="pie"
                       width="300"/>
            </Grid>
            </Grid>
        );
    }
    
}

export default PieChart;

