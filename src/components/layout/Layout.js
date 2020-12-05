import React, { Component } from 'react';
import _ from 'lodash';
//import { Responsive, WidthProvider, GridLayout } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';

import './layout.less';

//const ResponsiveGridLayout = WidthProvider(Responsive);

class Layout extends Component {
	static defaultProps = {
		className: 'layout',
		//cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
		cols: 12,
		rowHeight: 100,
		width: 1200,
	};

	state = {
		layout: this.props.layout,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.layout !== nextProps.layout) {
			return {
				layout: nextProps.layout,
			};
		}

		return null;
	}

	// onLayoutChange = (layout) => {
	// 	// this.props.setLayout(layout);
	// 	this.setState({ layout });
	// };

	createElement = (el) => {
		const removeStyle = {
			position: 'absolute',
			right: '2px',
			top: 0,
			cursor: 'pointer',
		};

		return (
			<div key={el._id} className='layout-item'>
				<span className='text'>{el._id}</span>
				<span
					className='remove'
					style={removeStyle}
					onClick={this.onRemoveItem.bind(this, el._id)}
				>
					x
				</span>
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
		//this.setState({ layout: _.reject(this.state.layout, { _id }) });
	};

	render() {
		var lyt = _.map(this.props.layout, (el)=>({i: el._id, w:el.w, h:el.h, x: el.x, y: el.y}))
		return (
			<GridLayout
				// onLayoutChange={this.onLayoutChange}
				onBreakpointChange={this.onBreakpointChange}
				onDragStop={this.onDragStop}
				onResizeStop={this.onResizeStop}
				className={this.props.className}
				cols={12}
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
