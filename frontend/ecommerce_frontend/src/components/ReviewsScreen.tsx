import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ReviewsProps {
  productId: number;
  productName: string;
  onClose?: () => void;
}

const ReviewsScreen: React.FC<ReviewsProps> = ({
  productId,
  productName,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
  });

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Sarah M.',
      rating: 5,
      title: 'Excellent quality and fast shipping!',
      content:
        'The product arrived in perfect condition. Better than expected. Highly recommend!',
      date: 'Mar 20, 2026',
      helpful: 245,
      verified: true,
    },
    {
      id: '2',
      author: 'John D.',
      rating: 4,
      title: 'Great product, minor issue',
      content:
        'Overall very satisfied. Just had a small defect but customer service was great.',
      date: 'Mar 18, 2026',
      helpful: 128,
      verified: true,
    },
    {
      id: '3',
      author: 'Emma L.',
      rating: 5,
      title: 'Perfect fit and amazing quality',
      content: 'Exactly as described. Will definitely buy again!',
      date: 'Mar 15, 2026',
      helpful: 89,
      verified: true,
    },
    {
      id: '4',
      author: 'Mike T.',
      rating: 3,
      title: 'Average product',
      content:
        'It works but nothing special. Expected better quality for the price.',
      date: 'Mar 12, 2026',
      helpful: 45,
      verified: false,
    },
    {
      id: '5',
      author: 'Lisa K.',
      rating: 5,
      title: 'Best purchase ever!',
      content: 'Amazing quality, fast delivery, great service. 10/10!',
      date: 'Mar 10, 2026',
      helpful: 312,
      verified: true,
    },
  ];

  const filteredReviews = filterRating
    ? mockReviews.filter((r) => r.rating === filterRating)
    : mockReviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const averageRating =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length;

  const ratingDistribution = {
    5: mockReviews.filter((r) => r.rating === 5).length,
    4: mockReviews.filter((r) => r.rating === 4).length,
    3: mockReviews.filter((r) => r.rating === 3).length,
    2: mockReviews.filter((r) => r.rating === 2).length,
    1: mockReviews.filter((r) => r.rating === 1).length,
  };

  const handleSubmitReview = () => {
    if (!newReview.title.trim() || !newReview.content.trim()) {
      Alert.alert('Missing Info', 'Please fill in title and content');
      return;
    }

    Alert.alert('Success', 'Your review has been posted!', [
      {
        text: 'OK',
        onPress: () => {
          setShowWriteReview(false);
          setNewReview({ rating: 5, title: '', content: '' });
        },
      },
    ]);
  };

  const renderRatingStar = (rating: number) => {
    return (
      <View style={styles.ratingStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text
            key={star}
            style={[
              styles.star,
              star <= rating ? styles.starFilled : styles.starEmpty,
            ]}
          >
            ★
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          Reviews & Ratings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Rating Summary */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingCard}>
          <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
          {renderRatingStar(Math.round(averageRating))}
          <Text style={styles.reviewCount}>
            {mockReviews.length} reviews
          </Text>
        </View>

        {/* Rating Distribution */}
        <View style={styles.distributionContainer}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              onPress={() =>
                setFilterRating(filterRating === rating ? null : rating)
              }
              style={[
                styles.distributionRow,
                filterRating === rating && styles.distributionRowActive,
              ]}
            >
              <Text style={styles.distributionLabel}>{rating}★</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${
                        (ratingDistribution[rating as keyof typeof ratingDistribution] /
                          mockReviews.length) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.distributionCount}>
                {ratingDistribution[rating as keyof typeof ratingDistribution]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sort & Write Review */}
      <View style={styles.actionBar}>
        <View style={styles.sortContainer}>
          <TouchableOpacity
            onPress={() => setSortBy('recent')}
            style={[
              styles.sortBtn,
              sortBy === 'recent' && styles.sortBtnActive,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === 'recent' && styles.sortTextActive,
              ]}
            >
              Recent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSortBy('helpful')}
            style={[
              styles.sortBtn,
              sortBy === 'helpful' && styles.sortBtnActive,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === 'helpful' && styles.sortTextActive,
              ]}
            >
              Helpful
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSortBy('rating')}
            style={[
              styles.sortBtn,
              sortBy === 'rating' && styles.sortBtnActive,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === 'rating' && styles.sortTextActive,
              ]}
            >
              Highest
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setShowWriteReview(true)}
          style={styles.writeBtn}
        >
          <Text style={styles.writeBtnText}>✍️ Write Review</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews List */}
      <FlatList
        data={sortedReviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewAuthor}>
                <Text style={styles.authorName}>{item.author}</Text>
                {item.verified && (
                  <Text style={styles.verifiedBadge}>✓ Verified</Text>
                )}
              </View>
              {renderRatingStar(item.rating)}
            </View>

            <Text style={styles.reviewTitle}>{item.title}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
            <Text style={styles.reviewContent}>{item.content}</Text>

            <View style={styles.reviewFooter}>
              <TouchableOpacity
                style={styles.helpfulBtn}
                onPress={() => Alert.alert('Coming Soon', 'Helpful voting feature is coming soon!')}
              >
                <Text style={styles.helpfulText}>👍 Helpful ({item.helpful})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reportBtn}
                onPress={() => Alert.alert('Coming Soon', 'Report feature is coming soon!')}
              >
                <Text style={styles.reportText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Write Review Modal */}
      <Modal
        visible={showWriteReview}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWriteReview(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { paddingTop: insets.top + 20 }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowWriteReview(false)}
                style={styles.modalBackBtn}
              >
                <Text style={styles.modalBackText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Write a Review</Text>
              <View style={styles.headerSpacer} />
            </View>

            <ScrollView
              contentContainerStyle={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.productName}>{productName}</Text>

              {/* Rating Selection */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Your Rating</Text>
                <View style={styles.ratingSelector}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                    >
                      <Text
                        style={[
                          styles.selectStar,
                          star <= newReview.rating
                            ? styles.selectStarActive
                            : styles.selectStarInactive,
                        ]}
                      >
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Title */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Review Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Summarize your experience"
                  placeholderTextColor="#707080"
                  value={newReview.title}
                  onChangeText={(text) =>
                    setNewReview({ ...newReview, title: text })
                  }
                />
              </View>

              {/* Content */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Your Review</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Share your experience with this product"
                  placeholderTextColor="#707080"
                  multiline
                  numberOfLines={6}
                  value={newReview.content}
                  onChangeText={(text) =>
                    setNewReview({ ...newReview, content: text })
                  }
                />
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity
                  onPress={() => setShowWriteReview(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSubmitReview}
                  style={styles.submitBtn}
                >
                  <Text style={styles.submitBtnText}>Post Review</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#E8C97A',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  ratingSection: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: '#18181F',
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 12,
  },
  ratingCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    color: '#E8C97A',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 52,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 8,
  },
  star: {
    fontSize: 20,
  },
  starFilled: {
    color: '#E8C97A',
  },
  starEmpty: {
    color: '#A0A0A0',
  },
  reviewCount: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 8,
  },
  distributionContainer: {
    gap: 8,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  distributionRowActive: {
    backgroundColor: '#2A2A35',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  distributionLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
    width: 30,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#2A2A35',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#E8C97A',
  },
  distributionCount: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
    width: 25,
    textAlign: 'right',
  },
  actionBar: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#18181F',
  },
  sortBtnActive: {
    backgroundColor: '#E8C97A',
  },
  sortText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
  },
  sortTextActive: {
    color: '#000',
  },
  writeBtn: {
    backgroundColor: '#E8C97A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  writeBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewAuthor: {
    flex: 1,
  },
  authorName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  verifiedBadge: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewDate: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 8,
  },
  reviewContent: {
    color: '#C0C0C8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  reviewFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  helpfulBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#2A2A35',
    borderRadius: 6,
    alignItems: 'center',
  },
  helpfulText: {
    color: '#E8C97A',
    fontSize: 12,
    fontWeight: '600',
  },
  reportBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#2A2A35',
    borderRadius: 6,
  },
  reportText: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  modalBackBtn: {
    padding: 8,
  },
  modalBackText: {
    fontSize: 24,
    color: '#E8C97A',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  modalBody: {
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  productName: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  ratingSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  selectStar: {
    fontSize: 32,
  },
  selectStarActive: {
    color: '#E8C97A',
  },
  selectStarInactive: {
    color: '#A0A0A0',
  },
  input: {
    backgroundColor: '#18181F',
    borderWidth: 1,
    borderColor: '#2A2A35',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 14,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8C97A',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E8C97A',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ReviewsScreen;
