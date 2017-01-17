/**********************************************************************************************
 *  This component is designed for Tribe Project in QQ mobile as a Imageviewer
 *  You can use it as a independent component in your App
 *
 *  @ examples  you can find examples in folder examples or README.md
 *
 *  @ param(array)       imagelist: The list of images to view
 *  @ param(bool)        disablePinch: Disable pinch function
 *  @ param(bool)        disableRotate: Disable rotate function
 *  @ param(bool)        disableDoubleTap: Disable double tap function
 *  @ param(function)    longTap: Events called after the long tap
 *
 *  Copyright by nemoliao( liaozksysu@gmail.com), nemo is a member of AlloyTeam in Tencent.
 *
 **********************************************************************************************/
import React, { Component } from 'react'
import AlloyFinger from './libs/alloyfinger.js'
import Transform from './libs/transform.js'
<<<<<<< HEAD
import { CenterImage } from './components.js'
=======
import CenterImg from './CenterImg.js'
>>>>>>> master
import Singleton from 'react-singleton'

import './index.less'

const MARGIN = 40

class ImageView extends Component {
    static propTypes = {
        imagelist: React.PropTypes.array.isRequired,
        disablePinch: React.PropTypes.bool,
        disableRotate: React.PropTypes.bool,
        disableDoubleTap: React.PropTypes.bool,
        longTap: React.PropTypes.func
    }

    constructor(props) {
        super();
<<<<<<< HEAD
        this.arrLength = props.imagelist.length;
=======
>>>>>>> master
    }

    state = {
        current: 0
    }

    initScale = 1;
<<<<<<< HEAD
=======
    arrLength = 0;
>>>>>>> master
    screenWidth = window.innerWidth || window.screen.availWidth;
    screenHeight = window.innerHeight || window.screen.availHeight;
    list = null;
    ob = null;
    focused = null;

    render() {
        return (
            <div className="imageview">
                <AlloyFinger
                    onPressMove={this.onPressMove.bind(this)}
                    onSwipe={this.onSwipe.bind(this)}>
                    <ul id="imagelist" ref="imagelist" className="imagelist">
                    {
                        this.props.imagelist.map((item, i) => {
                            return (
                                <li className="imagelist-item" key={"img"+i}>
                                    <AlloyFinger
                                        onPressMove={this.onPicPressMove.bind(this)}
                                        onMultipointStart={this.onMultipointStart.bind(this)}
                                        onLongTap={this.onLongTap.bind(this)}
                                        onPinch={this.onPinch.bind(this)}
                                        onRotate={this.onRotate.bind(this)}
                                        onMultipointEnd={this.onMultipointEnd.bind(this)}
                                        onDoubleTap={this.onDoubleTap.bind(this)}>
<<<<<<< HEAD
                                        <CenterImage id={`view${i}`} className="imagelist-item-img" src={item} />
=======
                                        <CenterImg id={`view${i}`} className="imagelist-item-img" src={item} />
>>>>>>> master
                                    </AlloyFinger>
                                </li>
                            )
                        })
                    }
                    </ul>
                </AlloyFinger>
<<<<<<< HEAD
                <div className="page">{ this.state.current + 1 } / { this.arrLength }</div>
=======
>>>>>>> master
            </div>
        )
    }

    componentDidMount() {
        this.arrLength = this.props.imagelist.length;
        this.list = this.refs['imagelist'];
        this.ob = document.getElementById('view'+this.state.current);

        Transform(this.list);
        Transform(this.ob);

        // for(let i = 0; i < this.arrLength; i++){
        //     let pic = document.getElementById('view'+i);
        //     Transform(pic);
        // }
    }

    onPressMove(evt){
        const { current } = this.state;

        this.endAnimation();

        if( !this.focused ){
            if((current === 0 && evt.deltaX > 0) || (current === this.arrLength - 1 && evt.deltaX < 0)){
                this.list.translateX += evt.deltaX / 3;
            }else{
                this.list.translateX += evt.deltaX;
            }
        }

        evt.preventDefault();
    }

    onPicPressMove(evt) {
        this.endAnimation();

        const { deltaX, deltaY } = evt;

        if(this.checkInArea(deltaX, deltaY)){
            this.ob.translateX += deltaX;
            this.ob.translateY += deltaY;
            this.focused = true;
        }else {
            this.focused = false;
        }
    }

    onSwipe(evt){
        const { direction } = evt;

        let { current } = this.state;
        if( this.focused ){
            return false;
        }
        switch(direction) {
            case 'Left':
                current < this.arrLength-1 && ++current && this.bindStyle(current);
                break;
            case 'Right':
<<<<<<< HEAD
                current > 0 && current-- && this.bindStyle(current);
=======
                current > 0 && --current && this.bindStyle(current);
>>>>>>> master
                break;
        }
        this.changeIndex(current)
    }

    onMultipointStart(){
        this.endAnimation();
    }

    onPinch(evt){
        if( this.props.disablePinch ){
            return false;
        }
        this.ob.scaleX = this.ob.scaleY = this.initScale * evt.scale;
        this.ob.style.webkitTransition = 'cubic-bezier(.15,.01,.88,1)'
    }

    onRotate(evt){
        if( this.props.disableRotate ){
            return false;
        }
        this.ob.rotateZ += evt.angle;
        this.ob.style.webkitTransition = 'cubic-bezier(.15,.01,.88,1)'
    }

    onLongTap(){
        this.props.longTap && this.props.longTap();
    }

    onMultipointEnd(evt){
        // translate to normal
        this.changeIndex(this.state.current);

        // scale to normal
        if (this.ob.scaleX < 1) {
            this.setScale(1);
        }
        if (this.ob.scaleX > 2) {
            this.setScale(2);
        }

        // rotate to normal
        let rotation = this.ob.rotateZ % 360,
            rate = this.ob.getAttribute('rate');

        if(rotation < 0){
            rotation = 360 + rotation;
        }
        this.ob.rotateZ = rotation;

        if (rotation > 0 && rotation < 45) {
            this.ob.rotateZ = 0;
            this.setScale(1);
        } else if (rotation >= 315) {
            this.ob.rotateZ = 360;
            this.setScale(1);
        } else if (rotation >= 45 && rotation < 135) {
            this.ob.rotateZ = 90;
            this.setScale(rate);
        } else if (rotation >= 135 && rotation < 225) {
            this.ob.rotateZ = 180;
            this.setScale(1);
        } else if (rotation >= 225 && rotation < 315) {
            this.ob.rotateZ = 270;
            this.setScale(rate);
        }
    }

    onDoubleTap(evt){
        if( this.props.disableDoubleTap ){
            return false;
        }

        const { origin } = evt,
            originX = origin[0] - this.screenWidth/2,
            originY = origin[1] - this.screenHeight/2;

        if(this.ob.scaleX === 1){
            this.ob.translateX = this.ob.originX = originX
            this.ob.translateY = this.ob.originY = originY;
            this.setScale(2);
        }else{
            this.ob.translateX = this.ob.originX;
            this.ob.translateY = this.ob.originY;
            this.setScale(1);
        }
    }

    bindStyle(current) {
        this.setState({ current }, () => {
<<<<<<< HEAD
            this.ob && this.restore();
            this.ob = document.getElementById(`view${current}`);
            if(this.ob && !this.ob.scaleX){ Transform(this.ob) }
=======
            this.restore();
            this.ob = document.getElementById(`view${current}`);
            if(!this.ob.scaleX){ Transform(this.ob) }
>>>>>>> master
        })
    }

    changeIndex(current) {
        this.list.style.webkitTransition = '300ms ease';
        this.list.translateX = -current*(this.screenWidth + MARGIN);
    }

    setScale(size) {
        this.ob.style.webkitTransition = '300ms ease-in-out';
        this.ob.scaleX = this.ob.scaleY = size;
    }

    restore() {
        this.ob.translateX = this.ob.translateY = 0;
        this.ob.rotateZ = 0;
        this.ob.scaleX = this.ob.scaleY = 1;
        this.ob.originX = this.ob.originY = 0;
    }

    endAnimation() {
        this.list.style.webkitTransition = '0';
<<<<<<< HEAD
        this.ob && this.ob.style && (this.ob.style.webkitTransition = '0');
=======
        this.ob.style.webkitTransition = '0';
>>>>>>> master
    }

    checkInArea(deltaX = 0, deltaY = 0) {
        const { scaleX, translateX, translateY, originX, originY } = this.ob,
            rate = this.ob.getAttribute('rate');

        if(scaleX !== 1 || scaleX !== rate){
            const rangeLeft = (scaleX - 1) * this.screenWidth / 2 + originX,
                rangeRight = -(scaleX - 1) * this.screenWidth / 2 + originX,
                rangeUp = (scaleX - 1) * this.screenHeight / 2 + originY,
                rangeDown = -(scaleX - 1) * this.screenHeight / 2 + originY;

            if(translateX - originX + deltaX <= rangeLeft
                && translateX - originX + deltaX >= rangeRight
                && translateY - originY + deltaY <= rangeUp
                && translateY - originY + deltaY >= rangeDown ) {
                return true;
            }
        }
        return false;
    }
}

export const SingleImgView = new Singleton(ImageView)

export default ImageView
