import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import Torch from 'react-native-torch';
import { contains } from 'lodash';

const blockedCountries = [
  'vietnam'
]

function App(): JSX.Element {
  const [ipInfo, setIpInfo] = useState<any>(null)
  const [isOn, setIsOn] = useState(false)
  useEffect(() => {
    Torch.switchState(isOn);
  }, [isOn])

  const onFlashToggle = () => {
    setIsOn(!isOn)
  }

  useEffect(() => {
    fetch("http://ip-api.com/json")
      .then((response) => response.json())
      .then((data) => {
        setIpInfo(data)
      })
  }, [])

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  if (!ipInfo) {
    return (<SafeAreaView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ActivityIndicator />
      <Text style={{ alignSelf: 'center' }}>Loading</Text>
    </SafeAreaView>)
  } else if (ipInfo && blockedCountries.includes(`${ipInfo.country}`.toLocaleLowerCase())) {
    return (
      <SafeAreaView style={{
        flex: 1
      }}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
          style={{
            backgroundColor: "#000000",
            flex: 1
          }}>
          <WebView source={{
            uri: 'https://www.facebook.com'
          }} style={{
            flex: 1
          }} />
        </View>
      </SafeAreaView>
    );
  } else {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TouchableOpacity onPress={onFlashToggle} style={{ backgroundColor: isOn ? "black" : 'yellow', alignSelf: 'center', marginTop: 64, padding: 16, borderRadius: 12 }}>
          <Text style={{ color: isOn ? 'white' : "black" }}>{isOn ? "TURN OFF" : "TURN ON"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default App;
