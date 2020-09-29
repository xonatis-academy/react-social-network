import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ServiceContext from '../ServiceContext';

export default class Profile extends React.Component {

    static contextType = ServiceContext;

    state = {
        listeDePosts: []
    }

    componentDidMount() {
        this.setState({
            listeDePosts: this.context.postService.list()
        })
    }

    handleLike = (post) => () => {
        this.context.postService.update(post.id, 'likes', post.likes + 1);
        this.setState({
            listeDePosts: this.context.postService.list()
        });
    }

    render() {
        let listeDesTagsPourLesPosts = [];
        for (const post of this.state.listeDePosts) {
            const element = (
                <View>
                    <Text>{post.content}</Text>
                    <Text>{post.likes} Like</Text>
                    <Button title="Liker" onPress={this.handleLike(post)} />
                </View>
            );
            listeDesTagsPourLesPosts.push(element);
        }

        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <Button title="Voir mes amis"  onPress={this.props.changeScreen('Friends')} />
                <Button title="Déconnexion"  onPress={this.props.changeScreen('Login')} />
                {listeDesTagsPourLesPosts}
            </View>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
