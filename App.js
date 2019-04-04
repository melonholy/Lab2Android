import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';


export default class App extends React.Component {
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
    })
  }
  render() {
    return (
      <ScrollView >
        <View style={styles.container}>
          {this.state.albums.map((item, index) => (
            <View key={index} style={{ width: "50%" }}>
              <Image source={{ uri: item.strAlbumThumb }} style={{ width: 100, height: 100 }} />
              <Text>
                {item.strAlbum}
              </Text>
              <Text>
                {item.intYearReleased}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
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
