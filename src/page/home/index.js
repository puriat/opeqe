import styles from './index.module.scss'
import React from 'react'
import TopSlider from '../../component/topSlider'
import {data} from './DummyData'
import HorizontalList from "../../component/horizontalList";

class Home extends React.Component {

    constructor() {
        super();
        this.state = {home: JSON.parse(data)}
    }

    componentDidMount() {
        console.log(this.state.home)
    }

    render() {
        return <div className={styles.container}>
            <TopSlider/>
            <div className={styles.home_body}>
                {
                    this.state.home.lists.map((list,index)=>{
                        return <HorizontalList data={list} key={index}/>
                    })
                }
            </div>
        </div>
    }
}

export default Home