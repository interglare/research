import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ListItem } from "react-native-elements";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    fetch("http://api.plos.org/search?q=title")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.response.docs });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  renderItem = ({ item }) => (
    <ListItem
      title={"asdad"}
      bottomDivider
      onPress={() => {
        this.props.navigation.navigate("Research", {
          item: item,
          name: item.title_display,
        });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{item.title_display.length<20?item.title_display:item.title_display.substr(0,80)+'...'}</ListItem.Title>
        <ListItem.Subtitle>{item.publication_date.substr(0,10)}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  render() {
    const { data, isLoading } = this.state;
    return (
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            keyExtractor={({ id }) => id}
            data={data}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

export default HomeScreen;
