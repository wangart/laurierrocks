
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';

var GiftedMessenger = require('react-native-gifted-messenger');
var Firebase = require('firebase');
var {Dimensions} = React;
var myDataRef = new Firebase("https://twodchat.firebaseio.com/");
const ghash = function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}();

class twodchat extends Component {


  componentDidMount() {
    that = this;
      myDataRef.on('child_added', function(snapshot) {
        that.handleReceive(snapshot.val());
      });
    }

  getMessages() {
    return [];
  }

  handleSend(message = {}, rowID = null) {
    console.log(this.hash);
    message.userHash = this.hash;
    console.log(message);
    myDataRef.push(message);  
  }

  handleReceive(message) {
    message.position = 'left';
    if (message.userHash === ghash) {

    } else {
      // this.setState({messages: this.state.messages.concat([message])});
      this._GiftedMessenger.appendMessage(message);
    }
  }

  render() {
    return (
      <View>
        <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
        />
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}

          messages={this.getMessages()}
          handleSend={this.handleSend}
          maxHeight={Dimensions.get('window').height} // 64 for the navBar
          hash = {ghash}

          styles={{
            bubbleLeft: {
              backgroundColor: '#e6e6eb',
              marginRight: 70,
            },
            bubbleRight: {
              backgroundColor: '#007aff',
              marginLeft: 70,
            },
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('twodchat', () => twodchat);
