import React, { Component } from 'react';
import './app.css';
import friend from './friends.json'
import Wrapper from './components/Wrapper/wrapper.js'
import Navpills from './components/Navbar/navmenu.js'
import Jumbotron from "./components/Jumbotron/jumbotron.js"
import FriendCard from './components/FriendCard/friendcard.js'

class App extends Component {
    state = {
        message: "...............................",
        topScore: 0,
        curScore: 0,
        friend: friend,
        unselectedfriend: friend
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectFriend = name => {
        const findFriend = this.state.unselectedfriend.find(item => item.name === name);

        if(findFriend === undefined) {
            // failure to select a new friend
            this.setState({ 
                message: "----------You Lost ------------!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                friend: friend,
                unselectedfriend: friend
            });
        }
        else {
            // success to select a new friend
            const newfriend = this.state.unselectedfriend.filter(item => item.name !== name);
            
            this.setState({ 
                message: "...............................",
                curScore: this.state.curScore + 1,
                friend: friend,
                unselectedfriend: newfriend
            });
        }

        this.shuffleArray(friend);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Jumbotron />
                {
                    this.state.friend.map(friend => (
                        <FriendCard
                            name={friend.name}
                            image={friend.image}
                            selectFriend={this.selectFriend} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

