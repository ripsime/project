import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './panel.less';

export default class Panel extends Component{
    
    state = {
        items: [
            { iconClass: "fas fa-home", text: 'Home', href: 'home', tooltip: false },
            { iconClass: "fas fa-tachometer-alt", text: 'Dashboard', href: 'dashboard', tooltip: false }
        ],
        panelMinimize: false
    }
    
    onPanelChange = () => {
        this.setState(({panelMinimize}) => {
            return {
                panelMinimize: !panelMinimize
            }
        })
    }

    toggleTooltip = (clazzez, tooltip) => {
        const newItems = []
        this.state.items.forEach(({iconClass, text, href}, idx) => {
            if(clazzez.includes(text)) {
                newItems[idx] = { iconClass, text, href, tooltip: tooltip }
            } else {
                newItems[idx] = { iconClass, text, href, tooltip: false }
            }
        })
        return {
            items: newItems
        }
    }

    onMouseOver = (e) => {
        // console.log(e.target)
        if(this.state.panelMinimize) {
            const clazzez = e.target.classList.value
            this.setState(() => {
                return this.toggleTooltip(clazzez, true)
            })
        }
    }

    onMouseOut = (e) => {
        if(this.state.panelMinimize) {
            const clazzez = e.target.classList.value
            this.setState(() => {
                return this.toggleTooltip(clazzez, false)
            })
        }
    }

    render() {
        const { panelMinimize, items } = this.state
        
        const classNames = panelMinimize ? 'panel-def panel-min' : 'panel-def panel-max'

        const listItems = items.map(({iconClass, text, href, tooltip}) => {
            return (
                <li key={text} className={text} 
                    onMouseOver={this.onMouseOver} 
                    onMouseOut={this.onMouseOut} >
                    <Link to={href} className={text}>
                        <i className={iconClass + ' ' + text}></i>
                        { panelMinimize ? null : <span className={text}>{text}</span> }                        
                    </Link>
                    { tooltip ? <div className='tooltip'>{text}</div> : null }
                </li>
            )
        })

        return (
            <div className={classNames}>
                <div className="burger" onClick={this.onPanelChange}>
                    <i className="fas fa-bars"></i>
                </div>
                <ul>
                    {listItems}
                </ul>
            </div>
        )
    }
}