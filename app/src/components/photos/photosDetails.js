'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput,
    NativeModules
} from 'react-native';

class PhotosDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pushEvent: props.pushEvent
        };

        NativeModules.ReadImageData.readImage(this.state.pushEvent.uri, (base64Image) => {
            console.log(base64Image);

            this.setState({
                base64Image: 'data:image/jpg;base64,' + base64Image
            });

        });
    }

    render() {
        var pic = <View />;
        if (this.state.pushEvent.uri) {
            pic = <Image
                source={{uri: this.state.pushEvent.uri}}
                resizeMode='stretch'
                style={styles.img}
            />
        } else {
            pic = <Image
                source={require('../../../no-img.png')}
                resizeMode='stretch'
                style={styles.img}
            />
        }

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingTop: 20,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>

                    {/*{pic}*/}

                    <Text style={styles.welcome1}>
                        {this.state.pushEvent.uri}
                    </Text>

                    <Image
                        source={{uri: this.state.base64Image}}
                        resizeMode='stretch'
                        style={styles.img}
                    />

                    {/*<Text style={styles.welcome1}>*/}
                        {/*{this.state.base64Image}*/}
                    {/*</Text>*/}

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 300,
        width: 300,
        borderRadius: 20,
        margin: 0
    },
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome1: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
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

export default PhotosDetails;
