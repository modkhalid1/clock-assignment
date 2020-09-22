import React, { Component } from 'react';
import BreakInfo from '../components/breakInfo';
import ClockController from '../components/clockController';
import SessionInfo from '../components/sessionInfo';
class App extends Component {

    constructor(props){
        super(props);
        this.url = "http://soundbible.com/mp3/sos-morse-code_daniel-simion.mp3";
        this.audio = new Audio(this.url);
        this.state = { 
            breakLength:5,
            sessionLength:25,
            timeLeft:[
                25,0
            ],
            isStartedClock:false,
            label:[
                "Session started",
            ]
        }
    }
    
    
    resetHandler=()=>{
        this.audio.play()
        this.setState({
            breakLength:5,
            timeLeft:[ 25, 0 ],
            sessionLength:25,
            label:[
                "Session started",
            ]
        })
        clearInterval(this.interval)

    }

    clockToggler=()=>{
        this.setState({isStartedClock:!this.state.isStartedClock});
    }

    
   

    formatDigit=()=>{
        let str="";
        if(this.state.timeLeft[0]<10){
            str+="0"+this.state.timeLeft[0];
        }else{
            str+=this.state.timeLeft[0]
        }
        str+=":";
        if(this.state.timeLeft[1]<10){
            str+="0"+this.state.timeLeft[1];
        }else{
            str+=this.state.timeLeft[1]
        }
        return str;

    }


    decBreakLength=()=>{
        if(this.state.isStartedClock && this.state.label.length%2 === 0){
            alert("Please stop the time first to update Break length")
            return;
        }
        if(this.state.breakLength<=1) return;

        const breakLength=this.state.breakLength-1
        const timeLeft=[...this.state.timeLeft];

        if(!this.state.isStartedClock &&  this.state.label.length % 2 === 0){
            // console.log("kjdfhg")
            timeLeft[0]=breakLength
            timeLeft[1]=0
        }

        this.setState({breakLength,timeLeft})
    }


    incBreakLength=()=>{
        if(this.state.isStartedClock && this.state.label.length%2 === 0){
            alert("Please stop the time first to update Break length")
            return;
        }
        if(this.state.breakLength>=60) return;

        const breakLength=this.state.breakLength + 1;
        const timeLeft=[...this.state.timeLeft];

        if(!this.state.isStartedClock &&  this.state.label.length % 2 === 0){
            timeLeft[0]=breakLength
            timeLeft[1]=0
        }

        this.setState({breakLength,timeLeft})
    }


    decSessionLength=()=>{
        if(this.state.isStartedClock && this.state.label.length%2 !== 0){
            alert("Please stop the time first to update session length")
            return;
        }
        if(this.state.sessionLength<=1) return;
        const sessionLength=this.state.sessionLength - 1;
        const timeLeft=[...this.state.timeLeft];

        if(!this.state.isStartedClock && this.state.label.length%2 !==0){
            timeLeft[0]=sessionLength;
            timeLeft[1]=0;
        }

        this.setState({sessionLength,timeLeft})
        
    }


    incSessionLength=()=>{
        if(this.state.isStartedClock && this.state.label.length%2 !== 0){
            alert("Please stop the time first to update session length")
            return;
        }
        if(this.state.sessionLength>=60) return;

        const sessionLength=this.state.sessionLength + 1;
        const timeLeft=[...this.state.timeLeft];

        if(!this.state.isStartedClock && this.state.label.length%2 !==0){
            timeLeft[0]=sessionLength;
            timeLeft[1]=0;
        }

        this.setState({sessionLength,timeLeft})
    }


    startStopTimer=()=>{
        
        if(!this.state.isStartedClock){
            this.setState({isStartedClock:!this.state.isStartedClock})
            this.interval=setInterval(() => {

                const timeLeft=[...this.state.timeLeft];
                timeLeft[1]--;
                if (timeLeft[1]===-1){
                    timeLeft[1]=59;
                    timeLeft[0]--;
                }

                if(timeLeft[0]<0){
                    // clearInterval(this.interval);
                    this.audio.play()
                    const label=[...this.state.label];
                    if(label.length %2===0){
                        timeLeft[0]=this.state.sessionLength;
                        label.push("Session Started")
                    }else{
                        timeLeft[0]=this.state.breakLength;
                        label.push("Break Started")
                    }
                    timeLeft[1]=0;
                    this.setState({label})
                }
                this.setState({timeLeft})
    
    
            }, 1000);
        }else{
            // this.state.isStartedClock=false;
            this.setState({isStartedClock:!this.state.isStartedClock})
            clearInterval(this.interval)
        }
        
    }





    render() { 
        const displayController=(
                <div className="row text-center mt-4">
                    <BreakInfo 
                        decrementBreak={this.decBreakLength}
                        incrementBreak={this.incBreakLength}
                        length={this.state.breakLength}
                    />
                    <SessionInfo
                        decrementSession={this.decSessionLength}
                        incrementSession={this.incSessionLength}
                        length={this.state.sessionLength}
                    />
                </div> 
            );

        return ( 
            
            
            <div className="container jumbotron mt-5">
                <h2 className="text-center">Welcome clock 25+5</h2>
                
                {displayController}       
                <hr/>
                <ClockController
                    label={this.state.label}
                    format={this.formatDigit}
                    controlTimer={this.startStopTimer}
                    reset={this.resetHandler}
                />
                
            </div>
        );
    }
}
 
export default App;