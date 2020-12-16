import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import GridLayout from 'react-grid-layout';
import CustomChart from '../../components/charts/CustomChart';

import './layout.less';

class Layout extends Component {
	static defaultProps = {
		className: 'layout',
		cols: 12,
		rowHeight: 100,
		width: 1200,
	};

	state = {
		layout: this.props.layout,
		data: this.props.data,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.layout !== nextProps.layout) {
			return {
				layout: nextProps.layout,
			};
		}

		return null;
	}	

	createElement = (el) => {
		return (
			<div key={el._id} className='layout-item'>
				<span className='remove' onClick={this.onRemoveItem.bind(this, el._id)}>
					<i className="fa fa-times"></i>
				</span>
				<CustomChart
					sensor={el.sensor}
					metric={el.metric}
					data={this.state.data[`${el.sensor}_${el.metric}`] || []}
					title={el.name}
					type={el.type}
					color="#3E517A"
				/>
			</div>
		);
	};

	onBreakpointChange = (breakpoint, cols) => {
		this.setState({
			breakpoint: breakpoint,
			cols: cols,
		});
	};

	changeLayout = (layout, oldLayoutItem, l) => {
		if (
			oldLayoutItem.x !== l.x ||
			oldLayoutItem.y !== l.y ||
			oldLayoutItem.w !== l.w ||
			oldLayoutItem.h !== l.h
		) {
			this.props.updateLayout(layout);
		}
	};

	onDragStop = (layout, oldDragItem, l) => {
		this.changeLayout(layout, oldDragItem, l);
	};

	onResizeStop = (layout, oldResizeItem, l) => {
		this.changeLayout(layout, oldResizeItem, l);
	};

	onRemoveItem = (_id) => {
		this.props.deleteLayout(_id);
	};

	render() {
		var lyt = _.map(this.props.layout, (el)=>({i: el._id, w:el.layout.w, h:el.layout.h, x: el.layout.x, y: el.layout.y, minW: 5, minH: 3, maxW: 12, maxH: 6}))
		
		// var lyt = _.map(this.props.layout, (el)=>{
		// 	console.log(el, 'want 3')
		// 	const { layout } = el;
			
		// 	return ({i: el.name, w:layout.w, h:layout.h, x: layout.x, y: layout.y})
		// })
		return (
			<GridLayout
				// onLayoutChange={this.onLayoutChange}
				onBreakpointChange={this.onBreakpointChange}
				onDragStop={this.onDragStop}
				onResizeStop={this.onResizeStop}
				className={this.props.className}
				cols={this.props.cols}
				rowHeight={this.props.rowHeight}
				width={this.props.width}
				layout={lyt}
			>
				{_.map(this.state.layout, (el) => this.createElement(el))}
			</GridLayout>
		);
	}
}

export default Layout;
