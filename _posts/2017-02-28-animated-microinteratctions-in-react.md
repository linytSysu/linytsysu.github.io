---
layout: post
title: How to build animated microinteractions in React
summary: 
tags: [react]
---

[https://medium.freecodecamp.com/how-to-build-animated-microinteractions-in-react-aab1cb9fe7c8#.v6vys27k6](https://medium.freecodecamp.com/how-to-build-animated-microinteractions-in-react-aab1cb9fe7c8#.v6vys27k6)

[live demo](https://search-animation.firebaseapp.com/)

[code](https://github.com/csepulv/search-box-animation)

## create-react-app
[GitHub - facebookincubator/create-react-app: Create React apps with no build configuration.](https://github.com/facebookincubator/create-react-app)
```
create-react-app search-box-animation
cd search-box-animation
npm install --save material-ui react-tap-event-plugin
```

## Using Higher Order Components to Separate Concerns
Higher Order Components (HOC) are functions that return a new component. 

## Animation
CSS transition and CSS animation
Expanding: [GitHub - csepulv/search-box-animation at expanding](https://github.com/csepulv/search-box-animation/tree/expanding)

## react-motion

## react-animations and aphrodite(or radium)

## Putting It Together: Composing a Complex Component
``` js
import React, {Component} from 'react';
import {headShake} from 'react-animations';
import {StyleSheet, css} from 'aphrodite';
const styles = StyleSheet.create({
    headShake: {
        animationName: headShake,
        animationDuration: '1s'
    }
});
const makeShakeAnimation = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {startShake: props.shouldShake};
        }

        componentWillReceiveProps(nextProps) {
            this.setState({startShake: nextProps.shouldShake}, () => {
                const self = this;
                setTimeout(() => self.setState({startShake: false}), 1000);
            });
            //https://css-tricks.com/restart-css-animation/ for discussion on restart
        }

        render() {
            return (
                <Target {...this.props}
                        frameClass={this.state.startShake ? css(styles.headShake) : ''}/>
            );
        }
    }
};
export default makeShakeAnimation;
```

``` js
import React, {Component} from 'react';

import makeExpanding from './expanding-animation';
import makeShakingAnimation from './shake-animation';

const makeAnimatedValidationSearchBox = (Target) => {
    const WrappedComponent = makeShakingAnimation(makeExpanding(Target));

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {query: '', hasError: false};
        }

        onQueryUpdate = (value) => {
            this.setState({query: value, hasError:false});
        };

        onSubmit = () => {
            this.setState({hasError: true});
        };

        render() {
            return (
                <WrappedComponent
                    onQueryUpdate={this.onQueryUpdate}
                    query={this.state.query}
                    onSubmit={this.onSubmit}
                    shouldShake={this.state.hasError}
                />
            );
        }
    }
};

export default makeAnimatedValidationSearchBox;
```