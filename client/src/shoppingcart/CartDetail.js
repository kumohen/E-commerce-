import React, { useEffect, useState } from "react";
import Payment from "./Product/Payment";
import { connect } from "react-redux";
import {
  fetchItem,
  addComment,
  clearGetItem,
  addToCart,
} from "./actions/index";
import { addReview } from "./actions/product";
import Review from "./Product/Reuse/Review";

const CartDetail = (props) => {
  const [comment, setComment] = useState("");
  const [review, setReview] = useState("");
  useEffect(() => {
    props.clearGetItem();
  }, []);
  useEffect(() => {
    props.fetchItem(props.match.params.id);
  }, [props]);

  const rendenItem = () => {
    return (
      <div className="card__detail">
        <div className="detail_left">
          <div>
            {props.item && props.item.image ? (
              <>
                {props.item.category === "mobile" ? (
                  <div className="m_container">
                    <img
                      src={props.item.image}
                      alt="mohen mondal"
                      className="m_img_detail"
                    />
                  </div>
                ) : (
                  <img
                    src={props.item.image}
                    alt="mohen mondal"
                    className="img_detail"
                  />
                )}
                <button
                  className="detail_button"
                  onClick={() => props.addToCart(props.item._id)}
                >
                  ADD TO CART
                </button>
                <div className="buy_now">
                  <Payment
                    name="BUY NOW"
                    price={props.item.price}
                    buy={true}
                    marginTop="-54px"
                    width="200px"
                    postId={props.match.params.id}
                  />{" "}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="detail_right">
          <p className="detail_title"> {props.item && props.item.title} </p>
          <p className="detail_des">{props.item && props.item.desc}</p>
          <p className="detail_price">
            <b>Price: </b> ₹{props.item && props.item.price}
          </p>
          {props.item &&
          (props.item.category === "mobile" ||
            props.item.category === "laptop") ? (
            <>
              <p className="detail_ram">
                <b>RAM: </b>{" "}
                {props.item && props.item.ram ? props.item.ram : ""}GB
              </p>
              <p className="detail_battery">
                <b>Battery: </b>
                {props.item && props.item.battery
                  ? props.item.category === "laptop"
                    ? " upto " + props.item.battery + " hour "
                    : props.item.battery + " mAh "
                  : ""}
              </p>
              <p className="detail_color">
                <b>Color: </b>
                {props.item && props.item.color ? props.item.color : ""}
              </p>
              <p className="detail_displaySize">
                <b>Display Size: </b>
                {props.item && props.item.displaySize
                  ? props.item.displaySize
                  : ""}
                inch
              </p>
              <p className="detail_storage">
                <b>Stroage: </b>
                {props.item && props.item.storage ? props.item.storage : ""}
                GB
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
  const renderComment = () => {
    return (
      props.item &&
      props.item.comments &&
      props.item.comments.map((item) => (
        <p key={item._id}>
          <b>{item.postedBy.name}</b> : {item.text}
        </p>
      ))
    );
  };

  const submitComment = (e) => {
    e.preventDefault();
    // console.log(this.props.match.params.id);
    const id = props.match.params.id;
    props.addComment(comment, id);
    setComment("");
  };
  const handleChange = (event) => {
    setReview(event.target.value);
  };
  const submitReview = (e) => {
    e.preventDefault();
    // console.log(this.props.match.params.id);
    const id = props.match.params.id;
    props.addReview(review, id);
  };
  var reviewArr = [];
  const fun = () => {
    if (props.item && props.auth.isLoginin && props.auth) {
      props.item.reviews &&
        props.item.reviews.forEach((item) => {
          return reviewArr.push(item.postedBy);
        });
    } else {
      return "a";
    }
  };

  fun();
  return (
    <div>
      {rendenItem()}
      <hr />
      <p className="cus_feedback"> Customer Feedback</p>
      {props.item && props.item.reviews ? (
        <Review reviews={props.item.reviews} />
      ) : (
        ""
      )}
      <hr />
      <div>
        {props.item &&
        props.auth.isLoginin &&
        props.auth &&
        props.item.reviews &&
        props.item.sells.includes(props.auth.login.user._id) &&
        !reviewArr.includes(props.auth.login.user._id) ? (
          <form onSubmit={submitReview}>
            <select value={review} onChange={handleChange} id="add_review">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
            </select>
            <button id="review">add review</button>
          </form>
        ) : (
          ""
        )}
        {props.item &&
        props.auth.isLoginin &&
        props.auth &&
        props.item.reviews &&
        props.item.sells.includes(props.auth.login.user._id) ? (
          <form onSubmit={submitComment}>
            <input
              type="text"
              name="comment"
              id="commentId"
              placeholder="write your review here"
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
        ) : (
          ""
        )}
        <br />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {renderComment()}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    item: state.items.getItem,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  fetchItem,
  addComment,
  clearGetItem,
  addToCart,
  addReview,
})(CartDetail);
