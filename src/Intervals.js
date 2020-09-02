import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { easeLinear } from 'd3';

export class Intervals extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }
    createBarChart() {
        const node = this.node

        const intervalYOffset = 50; // gives space for artwork

        let yValues = this.props.data.intervalData.map(interval => (
            interval.ftpPercent
        ));

        let intervalsToGraph = []; // contains exact dimensions for graphing
        var absoluteTimePosition = 0;
        for (var i = 0; i < this.props.data.intervalData.length; i++) {
            var dims = { x: absoluteTimePosition, y: yValues[i] };
            absoluteTimePosition += this.props.data.intervalData[i].durationSecs;
            dims.width = absoluteTimePosition - dims.x;
            intervalsToGraph.push(dims);
        }

        let artworkToGraph = [];
        if (this.props.playlistData) {
            var absoluteTimePosition = 0;
            for (let song of this.props.playlistData) {
                artworkToGraph.push({x: absoluteTimePosition, y: this.props.size[1] - intervalYOffset, song: song})
                absoluteTimePosition += song.durationMs / 1000;
            }
        }
        
        const dataMax = max([max(yValues), 200]); // 200 = % of FTP, not pixel size
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]]);

        const maxX = intervalsToGraph[intervalsToGraph.length-1].x + intervalsToGraph[intervalsToGraph.length-1].width;
        const xScale = scaleLinear()
            .domain([0,  maxX])
            .range([0, this.props.size[0]]);

        select(node)
            .selectAll('rect')
            .data(yValues)
            .enter()
            .append('rect');

        select(node)
            .selectAll('rect')
            .data(yValues)
            .exit()
            .remove();

        select(node)
            .selectAll('image')
            .data(artworkToGraph)
            .enter()
            .append('image');

        select(node)
            .selectAll('image')
            .data(artworkToGraph)
            .exit()
            .remove();

        let colorRange = scaleLinear()
            .domain([0, 200]) // 200 = % of FTP, not pixel size
            .range(["yellow", "red"])
            .unknown("#ccc");

        select(node)
            .selectAll('rect')
            .data(intervalsToGraph)
            .attr('fill', (d, i) => colorRange(d.y))
            .attr('x', (d, i) => xScale(d.x))
            .attr('y', d => this.props.size[1] - yScale(d.y))
            .attr('z', 10)
            .attr('height', d => yScale(d.y))
            .attr('width', (d) => xScale(d.width))
            .lower();

        select(node)
            .selectAll('line')
            .data([1])
            .enter()
            .append('line')
            .attr('stroke', 'white')
            .attr('stroke-dasharray', '5 2')
            .attr('x1', xScale(0))
            .attr('y1', this.props.size[1] - yScale(100))
            .attr('x2', xScale(maxX))
            .attr('y2', this.props.size[1] - yScale(100))
            .raise();
        
        select(node)
            .selectAll('path')
            .data([1])

        select(node)
            .selectAll('image')
            .data(artworkToGraph)
            .append("image")
            .attr('x', (d) => xScale(d.x))
            .attr('y', yScale(intervalYOffset))
            .attr('width', 64)
            .attr('height', 64)
            .attr("xlink:href", (d) => d.song.artwork);

    }
    render() {
        return <svg ref={node => this.node = node}
            width={this.props.size[0]} height={this.props.size[1]}>
        </svg>
    }
}
export default Intervals

// transitions
const TR_RISE_OVER_FTP       = 'TR_RISE_OVER_FTP';
const TR_RISE_SS             = 'TR_RISE_SS';
const TR_FALL_UNDER_75       = 'TR_FALL_UNDER_75';
const TR_FALL_UNDER_75_LT_1M = 'TR_FALL_UNDER_75_LT_1M'; // special case for intervals with breaks less than 1min
const TR_FALL_SS             = 'TR_FALL_SS';
const TR_END                 = 'TR_END';
const TR_STAY                = 'TR_STAY'; // no change

// states
export const WARMING      = 'WARMING';
export const COOL         = 'COOL'; 
export const SS_INTERVAL  = 'SS_INTERVAL';
export const VO2_INTERVAL = 'VO2_INTERVAL';
export const FINISH       = 'FINISH';

const validTransitions = {
    WARMING: {
        TR_RISE_OVER_FTP: WARMING,
        TR_RISE_SS: WARMING,
        TR_FALL_SS: WARMING,
        TR_FALL_UNDER_75: COOL
    },
    COOL: {
        TR_RISE_OVER_FTP: VO2_INTERVAL,
        TR_RISE_SS: SS_INTERVAL,
        TR_END: FINISH
    },
    SS_INTERVAL: {
        TR_FALL_UNDER_75: COOL,
        TR_RISE_OVER_FTP: VO2_INTERVAL,
        TR_END: FINISH
    },
    VO2_INTERVAL: {
        TR_FALL_SS: SS_INTERVAL,
        TR_FALL_UNDER_75: COOL,
        TR_END: FINISH
    }
}

export class StateMachine {
    constructor() {
        this.startState = WARMING;
    }

    /**
     * @param {Array} the interval data as configured
     * @returns {Array} an array of {duration, state} that can be used by the
     * playlist generator to select songs
     */
    computeIntervalIntensities(intervalData) {
        if (intervalData.length === 0) {
            return [];
        }
        let intensities = [];
        let curState = this.startState;
        intensities.push({
            state: this.startState, 
            durationSecs: intervalData[0].durationSecs
        });

        for (let i = 0; i < intervalData.length; i++) {
            let nextTransition = this.computeTransition(intervalData, i);
            let nextState = validTransitions[curState][nextTransition];
            if (nextState === FINISH) {
                intensities.push({
                    state: FINISH,
                    durationSecs: 0
                });
                break;
            } else if (nextState === TR_STAY || !nextState || nextState === curState) {
                // no transition
                intensities[intensities.length -1].durationSecs+= intervalData[i+1].durationSecs;
            } else {
                // new state
                intensities.push({
                    state: nextState,
                    durationSecs: intervalData[i+1].durationSecs
                })
                curState = nextState;
            }
        }
        return intensities;
    }

    /**
     * 
     * @param {Array} intervalData 
     * @param {Number} curPosition the interval we are switching from (curPos+1 is next)
     */
    computeTransition(intervalData, curPosition) {
        if (curPosition === intervalData.length - 1) {
            return TR_END;
        }
        const curFtp = intervalData[curPosition].ftpPercent;
        const nextFtp = intervalData[curPosition+1].ftpPercent;

        if (curFtp < 75 && nextFtp >= 75 && nextFtp < 100) {
            return TR_RISE_SS;
        }
        if (curFtp < 100 && nextFtp >= 100) {
            return TR_RISE_OVER_FTP;
        }
        if (curFtp >= 75 && nextFtp < 75) {
            // check if the next interval is less than 1 minute
            if (intervalData[curPosition+1].durationSecs <= 60) {
                return TR_FALL_UNDER_75_LT_1M;
            }
            return TR_FALL_UNDER_75;
        }
        if (curFtp > 100 && nextFtp >= 75 && nextFtp < 100) {
            return TR_FALL_SS;
        }
        return TR_STAY;
    }
}