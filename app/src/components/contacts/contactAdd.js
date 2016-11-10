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
            this.setState({
                base64Image: 'data:image/jpg;base64,' + base64Image
            });

        });
    }

    addClient() {
        if (this.state.name == undefined ||
            this.state.description == undefined) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        var id = (Math.random() * 1000000).toFixed();

        fetch('http://ui-collection.herokuapp.com/api/clients/add/', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                name: this.state.name,
                pic: this.state.base64Image,
                pics: [this.state.base64Image],
                description: this.state.description
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                App.clients.refresh = true;
                this.props.navigator.popToTop();
            })
            .catch((error)=> {
                console.log(error);
                this.setState({
                    serverError: true,
                    showProgress: false
                });
            })
    }

    render() {
        var errorCtrl, validCtrl;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator
                        size="large"
                        animating={true}/>
                </View>
            );
        }

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>

                    <Text style={styles.welcome1}>
                        New contact
                    </Text>

                    <Image
                        source={{uri: this.state.pushEvent.uri}}
                        resizeMode='stretch'
                        style={styles.img}
                    />

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            name: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput}
                        value={this.state.name}
                        placeholder="Name">
                    </TextInput>

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            description: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput1}
                        value={this.state.description}
                        multiline={true}
                        placeholder="Description">
                    </TextInput>

                    {validCtrl}

                    <TouchableHighlight
                        onPress={()=> this.addClient()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 250,
        width: 250,
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
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        marginTop: 5,
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
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black'
    },
    loginInput1: {
        height: 150,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black'
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
