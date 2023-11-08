import { useEffect, useState } from "react";
import axios from "./../utils/api";

function useLoadReviews(productId, page) {
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // function to load data
    const loadReviews = async () => {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/reviews/${productId}?page=${page}`
      );
      if (page === 0 && !!reviews) {
        setReviews([...response.data]);
      } else {
        setReviews((prevReviews) => [...prevReviews, ...response.data]);
      }

      setHasMore(response.data.length === 10);
      setLoading(false);
    };

    if (hasMore && !loading) {
      loadReviews();
    }
  }, [page, hasMore]);

  return { reviews, loading, hasMore };
}

export default useLoadReviews;
