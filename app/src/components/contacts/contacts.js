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
    TextInput
} from 'react-native';

import ContactDetails from './contactDetails';

class Contacts extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        console.log(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            resultsCount: 0,
            recordsCount: 5,
            positionY: 0
        };

        this.getContacts();
    }

    getContacts() {
        console.log('getContacts');
        fetch('http://ui-collection.herokuapp.com/api/clients/get', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort)),
                    resultsCount: responseData.length,
                    responseData: responseData.sort(this.sort),
                    filteredItems: responseData.sort(this.sort)
                });

            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    pressRow(rowData) {
        this.props.navigator.push({
            title: rowData.name,
            component: ContactDetails,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    renderRow(rowData) {
        var pic;

        if (rowData.pic) {
            pic = <Image
                source={{uri: rowData.pic}}
                resizeMode='stretch'
                style={styles.img}
            />
        } else {
            pic = <Image
                source={require('../../../no-img.png')}
                resizeMode='stretch'
                style={styles.img1}
            />
        }

        return (
            <TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'>
                <View style={styles.imgsList}>

                    {pic}

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>

                        <Text style={styles.text}>{rowData.name}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress == true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 5,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.getContacts()
            }, 100);
        }

        if (this.state.filteredItems == undefined) {
            return;
        }

        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        console.log(positionY + ' - ' + recordsCount + ' - ' + items.length);

        if (event.nativeEvent.contentOffset.y >= positionY - 550) {
            console.log(items.length);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 5,
                positionY: positionY + 600
            });

        }
    }

    onChangeText(text) {
        if (this.state.dataSource == undefined) {
            return;
        }

        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }

    render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={{
                justifyContent: 'center',
                height: 100
            }}>
                <ActivityIndicator
                    size="large"
                    animating={true}/>
            </View>;
        }

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginTop: 60}}>
                    <TextInput style={{
                        height: 45,
                        marginTop: 4,
                        padding: 5,
                        backgroundColor: 'white',
                        borderWidth: 3,
                        borderColor: 'lightgray',
                        borderRadius: 0,
                    }}
                               onChangeText={this.onChangeText.bind(this)}
                               value={this.state.searchQuery}
                               placeholder="Search">
                    </TextInput>

                    {errorCtrl}

                </View>

                {loader}

                <ScrollView
                    onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                    <ListView
                        style={{marginTop: -65, marginBottom: -45}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View style={{marginBottom: 49}}>
                    <Text style={styles.countFooter}>
                        {this.state.resultsCount} entries were found.
                    </Text>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    text1: {
        marginBottom: 5
    },
    img: {
        height: 110,
        width: 100,
        borderRadius: 20,
        margin: 15
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Contacts;
