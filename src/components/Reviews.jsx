import { useState, useRef, useCallback } from "react";
import useLoadReviews from "./useLoadReviews";
import { useParams } from "react-router-dom";

function Reviews() {
  const [page, setPage] = useState(0);
  const { productId } = useParams();
  const { reviews, loading, hasMore } = useLoadReviews(productId, page);
  const observer = useRef();
  console.log(page);
  const lastReviewRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          rootMargin: "100px",
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <h2>Reviews</h2>
      {reviews?.map((revw, index) => (
        <div
          className="review"
          key={index}
          ref={index === reviews.length - 1 ? lastReviewRef : null}
        >
          <h3 className="review-index">{index}</h3>
          <p className="review-text">{revw.review}</p>
          <p className="review-rating">{revw.rating}</p>
        </div>
      ))}

      <div>{loading ? "Loading..." : null}</div>
    </>
  );
}

export default Reviews;

{
  /*<div>
        {reviews?.map((revw, index) => {
          if (index === reviews.length - 1) {
            return (
              <div className="review" key={index} ref={lastReviewRef}>
                <h3 className="review-index">{index}</h3>
                <p className="review-text">{revw.review}</p>
                <p className="review-rating">{revw.rating}</p>
              </div>
            );
          } else {
            return (
              <div className="review" key={index}>
                <h3 className="review-index">{index}</h3>
                <p className="review-text">{revw.review}</p>
                <p className="review-rating">{revw.rating}</p>
              </div>
            );
          }
        })}
      </div>*/
}

// useEffect(() => {
//   const handleScroll = debounce(() => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//         document.documentElement.offsetHeight ||
//       !hasMore
//     ) {
//       return;
//     }

//     setPage((prevPage) => prevPage + 1);
//   }, 500); // delay 0.5s

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, [hasMore]);

/*
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        lastReviewRef.current &&
        window.innerHeight + document.documentElement.scrollTop >=
          lastReviewRef.current.offsetTop
      ) {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 100); // 0.5s delay

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, lastReviewRef]);
*/
