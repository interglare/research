import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import {
  ListItem,
  Icon,
  Text,
  Divider,
  AirbnbRating,
} from "react-native-elements";

class ResearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      journal: "",
      eissn: "",
      publication_date: "",
      author_display: [],
      abstract: [""],
      title_display: "",
      score: 0,
      expanded: false,
    };
  }
  componentDidMount() {
    let research = this.props.route.params.item;
    this.setState({
      id: research.id,
      eissn: research.eissn,
      publication_date: research.publication_date,
      author_display: research.author_display,
      abstract: research.abstract,
      title_display: research.title_display,
      score: research.score,
    });
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
        <Text h3 style={{ marginBottom: 30 }}>
          {this.state.title_display}
        </Text>
        <Text>{this.state.publication_date.substr(0, 10)}</Text>
        <Text>Rating: {this.state.score.toFixed(2)}/10</Text>
        <AirbnbRating
          count={10}
          size={20}
          readonly={true}
          showRating={false}
          defaultRating={this.state.score}
        />
        <View>
          <ListItem.Accordion
            content={
              <>
                <Icon name="group" style={{ paddingHorizontal: 10 }} />
                <ListItem.Content>
                  <ListItem.Title>Authors:</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={this.state.expanded}
            onPress={() => {
              this.setState({ expanded: !this.state.expanded });
            }}
          >
            {!this.state.expanded ? (
              <View></View>
            ) : (
              this.state.author_display.map((l, i) => (
                <ListItem key={i} containerStyle={{ paddingVertical: 4 }}>
                  <ListItem.Content>
                    <ListItem.Title>{l}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))
            )}
          </ListItem.Accordion>
        </View>
        <Text h4>Abstract</Text>
        <Divider style={{ backgroundColor: "blue" }} />
        <Text style={styles.abstract}>{this.state.abstract[0]}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  abstract: {
    textAlign: "left",
    margin: 5,
    marginTop: 15,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 50,
  },
});

export default ResearchScreen;
