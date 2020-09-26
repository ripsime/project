import React, { Component } from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

class Layout extends Component {
	static defaultProps = {
		className: 'layout',
		cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
		rowHeight: 100,
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
			this.props.setLayout({ layout });
		}
	};

	onDragStop = (layout, oldDragItem, l) => {
		this.changeLayout(layout, oldDragItem, l);
	};

	onResizeStop = (layout, oldResizeItem, l) => {
		this.changeLayout(layout, oldResizeItem, l);
	};

	onRemoveItem = (_id) => {
		console.log('removing', i);
		this.setState({ layout: _.reject(this.state.layout, { _id }) });
	};

	render() {
		// TODO Move add item button to dashboard
		return (
			<div>
				<button onClick={this.props.addItem}>Add Item</button>
				<ResponsiveGridLayout
					// onLayoutChange={this.onLayoutChange}
					onBreakpointChange={this.onBreakpointChange}
					onDragStop={this.onDragStop}
					onResizeStop={this.onResizeStop}
					{...this.props}
				>
					{_.map(this.state.layout, (el) => this.createElement(el))}
				</ResponsiveGridLayout>
			</div>
		);
	}
}

export default Layout;
