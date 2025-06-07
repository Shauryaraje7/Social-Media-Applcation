import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        setUserEmail(decoded.email); // Extract email from token
      }
    };
    fetchUserData();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }
      const response = await fetch('http://10.0.2.2:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        const postsWithLikes = data.map(post => ({
          ...post,
          likes: post.likes || [],
          comments: post.comments || [],
        }));
        setPosts(postsWithLikes);
      } else {
        console.log('Fetch posts error:', data.message);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  const createPost = async () => {
    if (!newPostContent.trim()) {
      Alert.alert('Error', 'Post content cannot be empty');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }
      const response = await fetch('http://10.0.2.2:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPostContent }),
      });
      const data = await response.json();
      if (response.ok) {
        setNewPostContent('');
        fetchPosts();
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
      console.log('Create post error:', error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }
      const response = await fetch(`http://10.0.2.2:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchPosts(); // Refresh posts to update likes
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle like');
      console.log('Toggle like error:', error);
    }
  };

  const addComment = async (postId) => {
    if (!newComment.trim()) {
      Alert.alert('Error', 'Comment cannot be empty');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }
      const response = await fetch(`http://10.0.2.2:5000/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });
      const data = await response.json();
      if (response.ok) {
        setNewComment('');
        setSelectedPostId(null);
        fetchPosts();
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
      console.log('Add comment error:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isLiked = userEmail && item.likes.includes(userEmail);
    const showComments = selectedPostId === item._id;
    return (
      <View style={styles.postItem}>
        <Text style={styles.postText}>{item.content}</Text>
        <Text style={styles.postMeta}>By: {item.userEmail} | {new Date(item.createdAt).toLocaleDateString()} | Likes: {item.likes.length}</Text>
        <TouchableOpacity onPress={() => toggleLike(item._id)} style={styles.likeButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill={isLiked ? 'red' : 'none'}>
            <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={isLiked ? 'red' : '#000'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.likeText}>{item.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedPostId(showComments ? null : item._id)} style={styles.commentButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM6 9H18V11H6V9ZM14 14H6V12H14V14ZM18 7H6V5H18V7Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.commentText}>Comments ({item.comments.length})</Text>
        </TouchableOpacity>
        {showComments && (
          <>
            {item.comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentMeta}>By: {comment.userEmail} | {new Date(comment.createdAt).toLocaleDateString()}</Text>
              </View>
            ))}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <Button title="Post Comment" color="#1E90FF" onPress={() => addComment(item._id)} />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Posts</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a new post..."
          value={newPostContent}
          onChangeText={setNewPostContent}
          multiline
        />
        <Button title="Post" color="#1E90FF" onPress={createPost} />
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f4f8' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: '#1E90FF', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  list: { marginBottom: 20 },
  postItem: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postText: { fontSize: 16, color: '#333' },
  postMeta: { fontSize: 12, color: '#666', marginTop: 5 },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likeText: { marginLeft: 5, fontSize: 14, color: '#333' },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentText: { marginLeft: 5, fontSize: 14, color: '#333' },
  commentItem: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 5,
  },
  commentMeta: { fontSize: 10, color: '#666', marginTop: 2 },
  commentInputContainer: { marginTop: 10 },
  commentInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
  },
});

export default Posts;