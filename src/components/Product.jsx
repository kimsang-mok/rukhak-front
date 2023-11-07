import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../features/productDetailSlice";
import { fetchMoreReviews } from "../features/moreReviewSlice";
import "./../styles/product.scss";

function Product() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    data: productDetail,
    status: productStatus,
    error: productError,
  } = useSelector((state) => state.productDetail);

  const {
    data: moreReviewsData,
    status: moreReviewsStatus,
    error: moreReviewError,
    page: reviewPage,
  } = useSelector((state) => state.moreReviews);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);
  // console.log(productDetail);

  //   const handlefetchMoreReviews = () => {
  //     dispatch(fetchMoreReviews(productId, reviewPage));
  //   };
  console.log(moreReviewsData);
  return (
    <>
      {productStatus === "loading" && <p>Loading todos...</p>}
      {productError === "failed" && <p>Error</p>}
      <h1>Product Title: {productDetail.title}</h1>
      <div>
        {productDetail.categories?.map((cat) => (
          <p key={cat}>{cat}</p>
        ))}
      </div>
      <h2>Reviews</h2>
      <div>
        {productDetail.reviews?.map((revw) => (
          <div className="review" key={revw._id}>
            <p className="review-text">{revw.review}</p>
            <p className="review-rating">{revw.rating}</p>
          </div>
        ))}
        <Link to={`/product/${productId}/reviews`}>Load More Reviews</Link>
      </div>
    </>
  );
}

export default Product;
