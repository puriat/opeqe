import React from 'react'
import styles from './index.module.scss'
import {AccessAlarm, ArrowForwardIos, ArrowBackIos} from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import {
    Link
} from "react-router-dom";

const renderItems = (items, listRef) => {
    return <div className={styles.list_container}>
        <div className={styles.list} ref={listRef}>
            {
                items.map((item, index) => {
                    return <div key={index} className={styles.item}>

                        <div className={styles.image_container}>
                            <Link to={"/search"}>
                                <img src={item.image} className={styles.image}/>
                                <span className={styles.sub}>{item.cuisineType.title}</span>
                            </Link>
                        </div>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.sub_title}><span
                            className={styles.menu}>{item.menuType.title}.</span><span
                            className={styles.sub}>  {item.cuisineType.title}.</span><span
                            className={styles.sub}> {item.courseType.title}.</span></div>

                        <Grid container justify={"space-between"} className={styles.extra}>
                            <span>
                                <span className={styles.time}><AccessAlarm/> {item.preparation} Mins</span>
                                <span className={styles.price}>${item.price}</span>
                            </span>
                            {
                                item.delivery === 0 &&
                                <span className={styles.delivery}>Free Delivery</span>
                            }
                        </Grid>

                    </div>
                })
            }
        </div>
    </div>
}

class HorizontalList extends React.Component {

    constructor() {
        super();
        let windowSize = 3
        if (window.innerWidth <= 600) {
            windowSize = 1
        } else if (window.innerWidth <= 768) {
            windowSize = 2
        }

        this.state = {
            currentWindowIndex: 0,
            windowSize
        }
        this.listRef = React.createRef();
        this.cursorRef = React.createRef();
    }

    nextClicked() {
        const numberOfWindows = Math.ceil(this.props.data.items.length / this.state.windowSize)
        if (this.state.currentWindowIndex + 1 !== numberOfWindows) {
            let index = this.state.currentWindowIndex + 1
            this.setState({currentWindowIndex: index})
            this.listRef.current.style.transform = "translateX(-" + 100 * (index) + "%) translateX(+" + this.state.windowSize * 20 * index + "px)"

            this.cursorPostion(index)
        }
    }

    prevClicked() {
        if (this.state.currentWindowIndex !== 0) {
            let index = this.state.currentWindowIndex - 1
            this.setState({currentWindowIndex: index})
            this.listRef.current.style.transform = "translateX(-" + 100 * (index) + "%) translateX(+" + this.state.windowSize * 20 * index + "px)"

            this.cursorPostion(index)
        }
    }

    cursorPostion(index) {
        const numberOfWindows = Math.ceil(this.props.data.items.length / this.state.windowSize)
        let cursorLeft = (Math.round(100 / (numberOfWindows - 1)) * index) + "%"
        if (index + 1 === numberOfWindows) {
            cursorLeft = "calc(100% - 30px)"
        }
        this.cursorRef.current.style.left = cursorLeft
    }

    render() {
        const {data} = this.props
        const windowNumber = Math.ceil(this.props.data.items.length / this.state.windowSize)
        return <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>{data.title}</div>
                <div className={styles.bar}>
                    <div className={styles.cursor} ref={this.cursorRef}/>
                </div>
            </div>
            <div>
                {renderItems(data.items, this.listRef)}

                {
                    windowNumber > 1 && (this.state.currentWindowIndex + 1 !== windowNumber) &&
                    <div className={`${styles.control} ${styles.next}`}>
                        <Fab aria-label="add" onClick={this.nextClicked.bind(this)}>
                            <ArrowForwardIos/>
                        </Fab>
                    </div>
                }

                {
                    windowNumber > 1 && (this.state.currentWindowIndex !== 0) &&
                    <div className={`${styles.control} ${styles.prev}`}>
                        <Fab aria-label="add" onClick={this.prevClicked.bind(this)}>
                            <ArrowBackIos/>
                        </Fab>
                    </div>
                }

            </div>
        </div>
    }
}

export default HorizontalList