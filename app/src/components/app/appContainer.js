'use strict'

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicatorIOS,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

import Search from '../movies/search';
import Movies from '../movies/movies';

class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 'Movies',
            searchQuery: 'Sex'
        }
    }

    render(){

      return (
        <TabBarIOS style={styles.AppContainer}>

        <TabBarIOS.Item
            title="Movies"
            systemIcon="favorites"
            selected={this.state.selectedTab == 'Movies'}
            onPress={()=> this.setState({selectedTab: 'Movies'})}>

            <NavigatorIOS
                style={{
                    flex: 1
                }}
                initialRoute={{
                    component: Movies,
                    title: 'Movies',
                    passProps: {
                        searchQuery: 'Sex'
                    }
                }}
           />
        </TabBarIOS.Item>

            <TabBarIOS.Item
                title="Search"
      					systemIcon="search"
                selected={this.state.selectedTab == 'Search'}
                onPress={()=> this.setState({selectedTab: 'Search'})}>

                <NavigatorIOS
                    style={{
                        flex: 1
                    }}
                    initialRoute={{
                        component: Search,
                        title: 'Search'
                		}}
               />
            </TabBarIOS.Item>

        </TabBarIOS>
      );
    }
}

/*
systemIcon List:
bookmarks
contacts
downloads
favorites
featured
history
more
"most-recent"
"most-viewed"
recents
search
"top-rated"
*/

const styles = StyleSheet.create({
    AppContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 20,
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

module.exports = AppContainer;
