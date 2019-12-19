import React, {Component} from 'react';
import Carousel from 'react-material-ui-carousel'
import Paper from '@material-ui/core/Paper'

export default class App extends Component {
    state = {
        bulletins: [
            {
                name: "AWS",
                image: "https://www.multichannel.com/.image/t_share/MTU0MDYzODU3ODUyMDk4Mjk5/aws-logojpg.jpg",
                summary: "This project is deployed on AWS using an Ubuntu instance, managed with nginx"
            },
            {
                name: "?",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgoiVJRONG6vadONoofuxLSkWyZ4SF6k91C8KbpTpKw1u6FGS14g&s",
                summary: "If you see one of these on a component, clicking will bring up a modal with details!"
            },
            {
                name: "MongoDB",
                image: "https://mpng.pngfly.com/20180802/rea/kisspng-mongodb-nosql-document-oriented-database-portable-thessalon%C3%ADki-mongodb-user-group-thessalon%C3%ADki-g-5b639f094f4492.3705371015332554333247.jpg",
                summary: "This project's data is handled by MongoDB for fast, easy sorting of user information."
            },
            {
                name: "React",
                image: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
                summary: "Using React allows this front end to be responsive and interactive without page reloads, with easier coding for the developer's sake!"
            },
            {
                name: "Redux",
                image: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
                summary: "Using redux and axios, information is easily pulled from Mongodb to be used globally on the site with far fewer server requests, providing a faster user experience"
            },
            {
                name: "Material UI",
                image: "https://www.stickpng.com/assets/thumbs/58480f86cef1014c0b5e493b.png",
                summary: "Using Material UI produces great visuals and functionality on the front end with far less effort under the hood, allowing the developer to focus on functionality"
            }
        ]
    }

    carouselItem = (item)=>{
        return (
            <Paper justify='center'>
                <h2 style={{textAlign:'center'}}>{item.name}</h2>
                <img src={item.image} alt='' style={{width:'100px', height:'auto', display:'block', marginLeft:'auto', marginRight:'auto',}} />
                <p style={{textAlign:'center'}}>{item.summary}</p>
                <br />
     
            </Paper>
        )
    }
    render(){
        return (
            <Carousel
                autoPlay={true}
                interval={6000}
                animation={"fade"}
            >
            {
                this.state.bulletins.map( item => {
                    return this.carouselItem(item)
                })
            }
            </Carousel>
        )
    }
}