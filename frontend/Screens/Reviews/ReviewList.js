import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ReviewList = ({ navigation }) => {
  // Dummy data for reviews
  const [reviews, setReviews] = useState([
    { id: 1, rating: 4, comment: "Great product!" },
  ]);

  // Function to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.star}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={24}
            color="#FFD700"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // New state variable and function to handle new review
  const [newRating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleAddReview = () => {
    // Add your logic here to submit the new review
    // For example, you could add the new review to the `reviews` array
    const newReview = {
      id: reviews.length + 1,
      rating: newRating,
      comment: newComment,
    };
    setReviews([...reviews, newReview]);
    setNewComment("");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: 'white' }]}>Reviews</Text>
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewContainer}>
          <View style={styles.ratingContainer}>
            {renderStars(review.rating)}
          </View>
          <Text style={[styles.comment, { color: 'white' }]}>{review.comment}</Text>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Add a new comment..."
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddReview}>
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  comment: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  star: {
    marginRight: 5,
  },
});

export default ReviewList;