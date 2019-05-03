import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, AsyncStorage } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

class MainPage extends React.Component {
  state = {
    albums: [],
  }

  componentWillMount() {
    fetch(
      "https://theaudiodb.com/api/v1/json/195003/searchalbum.php?s=Architects&s=Bring me the horizon"
    ).then(res => {
      let result = JSON.parse(res._bodyText)
      this.setState({
        albums: result.album,
      })
      AsyncStorage.setItem("albums", JSON.stringify(result.album));
    }).catch(() => {
      AsyncStorage.getItem("albums")
        .then(res => {
          if (res) {
            this.setState({ albums: JSON.parse(res.album) });
          } else this.setState({ albums: [] });
        })
        .done();
    });

  }
  render() {
    return (
      <ScrollView style={{ flex: 1, marginTop: 20 }} >
        <View style={styles.container}>
          {this.state.albums.map((item, index) => (
            <View key={index} style={{ alignItems: "center", width: "50%", height: 300 }}>
              <Image source={{ uri: item.strAlbumThumb }} style={{ width: 100, height: 100 }} />
              <Text>
                {item.strAlbum}
              </Text>
              <Text>
                {item.intYearReleased}
              </Text>
              <Button
                style={{ alignSelf: 'flex-end', width: '70%' }}
                title="Go to Details"
                onPress={() => {
                  this.props.navigation.navigate('Details', {
                    album: item
                  });
                }}
              />
            </View>
          ))}
        </View>
      </ ScrollView>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const album = navigation.getParam('album');
    return (
      <ScrollView style={{ flex: 1, marginTop: 20 }} >
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: album.strAlbumThumb }} style={{ width: 200, height: 200 }} />
          <Text>
            {album.strAlbum}
          </Text>
          <Text>
            {album.strStyle}
          </Text>
          <Text>
            {album.intYearReleased}
          </Text>
          {album.strDescriptionEN != null &&
            <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
              Description:
            </Text>
          }
          <Text>
            {album.strDescriptionEN}
          </Text>
          {album.strReview !== '' &&
            <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
              Review:
            </Text>
          }
          <Text >
            {album.strReview}
          </Text>
        </View>
      </ ScrollView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    MainPage: {
      screen: MainPage,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'MainPage',
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});
