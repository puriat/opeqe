import React from 'react'
import style from './index.module.scss'
import HomeHeaderImage from '../../image/HomeHeader.jpg'
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import {withStyles} from '@material-ui/core/styles';
import {
    Link
} from "react-router-dom"

const firstItemId = "top-slider-first-item";
const secondItemId = "top-slider-second-item";
const scrollTimer = 3000 //ms

const renderItems = (current, prev, firstDisplay) => {
    return <Grid item xs={4}>
        <div className={`${style.item} ${style.show_first}`} id={firstItemId}>
            <div className={style.title}>{current.title}</div>
            <div className={style.subTitle}>{current.subTitle}</div>
            <div className={style.description}>{current.description}</div>
            <div className={style.button}>
                <Link to={"/search"}>
                    Use&nbsp;
                    <span className={style.title}>
                     {current.title}
                    </span>
                </Link>
            </div>
        </div>

        <div className={`${style.item} ${style.hide_second}`} id={secondItemId}>
            <div className={style.title}>{prev.title}</div>
            <div className={style.subTitle}>{prev.subTitle}</div>
            <div className={style.description}>{prev.desctiption}</div>
            <div className={style.button}>
                <Link to={"/search"}>
                    Use&nbsp;
                    <span className={style.title}>
                        {prev.title}
                    </span>
                </Link>
            </div>
        </div>
    </Grid>
}

const GreenRadio = withStyles({
    root: {
        color: "#026764",
        '&$checked': {
            color: "#026764",
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

const renderDots = (items, currentIndex, onChange) => {
    return <div className={style.dots} width="auto">
        {
            items.map((item, index) => {
                return <GreenRadio
                    key={index}
                    checked={currentIndex === index}
                    onClick={() => onChange(index)}
                    value={index}
                    name="radio-button-demo"
                />
            })
        }
    </div>
}

class TopSlider extends React.Component {
    constructor() {
        super();

        this.state = {
            sliderReuseIndex: 0,
            firstDisplay: true,
            sliderIndex: 0,
            interval: null,
            firstItemIndex: 0,
            secondItemIndex: 0,
            items: [
                {
                    title: "Breakfast Special",
                    subTitle: "Get 15% off when you order 3 or more Blueberry Pancake Breakfast",
                    description: ""
                },
                {
                    title: "Chief Special",
                    subTitle: "Get $10 off when you order $20 or more T-Bone Steak & Eggs",
                    description: ""
                },
                {
                    title: "code FREEDINE",
                    subTitle: "Enjoy $10 Off When you order two or more of Blueberry Pancake Breakfast",
                    description: "The Coupon is only applicable for the specific item and can not be combine with any other order"
                }
            ]
        }
    }

    componentDidMount() {
        this.addChangeInterval()
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    addChangeInterval() {
        let interval = setInterval(() => {
            let {sliderIndex} = this.state;
            sliderIndex = sliderIndex + 1
            this.changeSlide(sliderIndex)
        }, scrollTimer)
        this.setState({interval})
    }

    changeSlide(sliderIndex) {
        let {sliderReuseIndex} = this.state;
        sliderReuseIndex = sliderReuseIndex + 1
        const {items} = this.state;
        if (sliderIndex === items.length) {
            sliderIndex = 0
        }


        if (document.getElementById(firstItemId).classList.contains(style["hide_first"])) {
            document.getElementById(firstItemId).classList.remove(style["hide_first"])
            document.getElementById(secondItemId).classList.remove(style["show_second"])
        } else {
            document.getElementById(firstItemId).classList.add(style["hide_first"])
            document.getElementById(secondItemId).classList.add(style["show_second"])
        }

        let {firstItemIndex, secondItemIndex} = this.state;
        if (sliderReuseIndex % 2 === 0) {
            firstItemIndex = sliderIndex;
        } else {
            secondItemIndex = sliderIndex
        }
        if (firstItemIndex < 0) {
            firstItemIndex = items.length - 1
        }
        if (secondItemIndex < 0) {
            secondItemIndex = items.length - 1
        }

        this.setState({sliderIndex, sliderReuseIndex, firstDisplay: false, firstItemIndex, secondItemIndex});
    }

    handleChange(selectedSliderIndex) {
        clearInterval(this.state.interval)
        this.changeSlide(selectedSliderIndex)
        this.addChangeInterval()
    };

    render() {
        const {firstDisplay} = this.state;


        return <div className={style.container}>
            <img className={style.image} src={HomeHeaderImage} alt={""}/>
            <Grid container>
                {renderItems(this.state.items[this.state.firstItemIndex], this.state.items[this.state.secondItemIndex], firstDisplay)}
            </Grid>
            <div>
                {renderDots(this.state.items, this.state.sliderIndex, this.handleChange.bind(this))}
            </div>
        </div>
    }
}

export default TopSlider