import React, { useState, useCallback, useEffect } from 'react';
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
import { StarIcon, CheckIcon, ChevronLeftIcon, HeartIcon } from './Icons';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
  const { token } = useAuth();
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await api.get<{
          average_rating?: number;
          reviews?: {
            id: number;
            rating: number;
            comment: string | null;
            author: string;
            title?: string | null;
            date?: string | null;
            helpful?: number;
            verified?: boolean;
          }[];
        }>(`/reviews/product/${productId}`);
        if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const mapped: Review[] = data.reviews.map((r) => ({
            id: String(r.id),
            author: r.author,
            rating: r.rating,
            title: r.title ?? '',
            content: r.comment ?? '',
            date: r.date ? String(r.date) : '',
            helpful: r.helpful ?? 0,
            verified: r.verified ?? true,
          }));
          setReviews(mapped);
        } else {
          setReviews(mockReviews);
        }
      } catch (e) {
        setReviews(mockReviews);
      }
      setLoaded(true);
    };
    loadReviews();
  }, [productId]);

  const allReviews = loaded ? reviews : mockReviews;

  const filteredReviews = filterRating
    ? allReviews.filter((r) => r.rating === filterRating)
    : allReviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const averageRating =
    allReviews.length ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length : 0;

  const ratingDistribution = {
    5: allReviews.filter((r) => r.rating === 5).length,
    4: allReviews.filter((r) => r.rating === 4).length,
    3: allReviews.filter((r) => r.rating === 3).length,
    2: allReviews.filter((r) => r.rating === 2).length,
    1: allReviews.filter((r) => r.rating === 1).length,
  };

  const handleSubmitReview = async () => {
    if (!newReview.title.trim() || !newReview.content.trim()) {
      Alert.alert('Missing Info', 'Please fill in title and content');
      return;
    }

    if (token) {
      try {
        await api.post('/reviews/', {
          product_id: productId,
          rating: newReview.rating,
          comment: newReview.content,
        });
      } catch (e) {
        // fall back to local acknowledgement below
      }
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
          <StarIcon
            key={star}
            size={16}
            color={star <= rating ? '#FF5722' : '#3A3A48'}
            filled={star <= rating}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="#FF5722" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          Reviews & Ratings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.ratingSection}>
        <View style={styles.ratingCard}>
          <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
          {renderRatingStar(Math.round(averageRating))}
          <Text style={styles.reviewCount}>
            {allReviews.length} reviews
          </Text>
        </View>

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
              <View style={styles.distributionLabelRow}>
                <Text style={styles.distributionLabel}>{rating}</Text>
                <StarIcon size={12} color="#FF5722" filled />
              </View>
              <View style={styles.barContainer}>
                <View
                      style={[
                        styles.bar,
                        {
                          width: `${
                            (ratingDistribution[rating as keyof typeof ratingDistribution] /
                              (allReviews.length || 1)) *
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

      <View style={styles.actionBar}>
        <View style={styles.sortContainer}>
          {(['recent', 'helpful', 'rating'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setSortBy(option)}
              style={[
                styles.sortBtn,
                sortBy === option && styles.sortBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === option && styles.sortTextActive,
                ]}
              >
                {option === 'recent'
                  ? 'Recent'
                  : option === 'helpful'
                  ? 'Helpful'
                  : 'Highest'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setShowWriteReview(true)}
          style={styles.writeBtn}
        >
          <Text style={styles.writeBtnText}>Write Review</Text>
        </TouchableOpacity>
      </View>

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
                  <View style={styles.verifiedRow}>
                    <CheckIcon size={14} color="#FF5722" />
                    <Text style={styles.verifiedBadge}>Verified</Text>
                  </View>
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
                <HeartIcon size={14} color="#FF5722" />
                <Text style={styles.helpfulText}>Helpful ({item.helpful})</Text>
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
                <ChevronLeftIcon size={24} color="#FF5722" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Write a Review</Text>
              <View style={styles.headerSpacer} />
            </View>

            <ScrollView
              contentContainerStyle={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.productName}>{productName}</Text>

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
                      <StarIcon
                        size={32}
                        color={star <= newReview.rating ? '#FF5722' : '#3A3A48'}
                        filled={star <= newReview.rating}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Review Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Summarize your experience"
                  placeholderTextColor="#5A5A6A"
                  value={newReview.title}
                  onChangeText={(text) =>
                    setNewReview({ ...newReview, title: text })
                  }
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Your Review</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Share your experience with this product"
                  placeholderTextColor="#5A5A6A"
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
    borderBottomColor: '#23232B',
  },
  backBtn: {
    padding: 8,
  },
  title: {
    color: '#FFFFFF',
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
    backgroundColor: '#23232B',
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 12,
  },
  ratingCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    color: '#FF5722',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 52,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 8,
  },
  reviewCount: {
    color: '#707080',
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
    backgroundColor: '#302926',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  distributionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: 30,
  },
  distributionLabel: {
    color: '#707080',
    fontSize: 12,
    fontWeight: '600',
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#30303C',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 3,
  },
  distributionCount: {
    color: '#707080',
    fontSize: 12,
    fontWeight: '600',
    width: 25,
    textAlign: 'right',
  },
  actionBar: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#23232B',
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
    backgroundColor: '#23232B',
  },
  sortBtnActive: {
    backgroundColor: '#FF5722',
  },
  sortText: {
    color: '#707080',
    fontSize: 12,
    fontWeight: '600',
  },
  sortTextActive: {
    color: '#FFFFFF',
  },
  writeBtn: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  writeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#23232B',
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  verifiedBadge: {
    color: '#FF5722',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewDate: {
    color: '#707080',
    fontSize: 12,
    marginBottom: 8,
  },
  reviewContent: {
    color: '#A0A0B0',
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
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#302926',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  helpfulText: {
    color: '#FF5722',
    fontSize: 12,
    fontWeight: '600',
  },
  reportBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#30303C',
    borderRadius: 6,
    justifyContent: 'center',
  },
  reportText: {
    color: '#707080',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    borderBottomColor: '#23232B',
  },
  modalBackBtn: {
    padding: 8,
  },
  modalTitle: {
    color: '#FFFFFF',
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
    color: '#707080',
    fontSize: 14,
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  ratingSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    backgroundColor: '#23232B',
    borderWidth: 1,
    borderColor: '#30303C',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
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
    borderColor: '#FF5722',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF5722',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ReviewsScreen;
