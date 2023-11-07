import { useEffect, useState } from "react";
import axios from "./../utils/api";
import { useParams } from "react-router-dom";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        !hasMore
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  console.log(page);

  useEffect(() => {
    // Function to load data
    const loadReviews = async () => {
      setLoading(true);
      const response = await axios.get(
        `/api/v1/reviews/${productId}?page=${page}`
      );
      console.log(response.data);
      setReviews((prevReviews) => [...prevReviews, ...response.data]);
      setHasMore(response.data.length === 10);
      setLoading(false);
    };

    if (hasMore && !loading) {
      loadReviews();
    }
  }, [page, hasMore]);
  console.log(count);

  return (
    <>
      <h2>Reviews</h2>
      <div>
        {reviews?.map((revw, index) => (
          <div className="review" key={index}>
            <h3>{index}</h3>
            <p className="review-text">{revw.review}</p>
            <p className="review-rating">{revw.rating}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;
