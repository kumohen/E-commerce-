const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cart = mongoose.model("Cart");
const stripe = require("stripe")("Your own stripe key");

const requireLogin = require("../middleware/requireLogin");

router.get("/allItem", (req, res) => {
  Cart.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/item/man", (req, res) => {
  Cart.find({ category: "man" })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/item/women", (req, res) => {
  Cart.find({ category: "women" })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/item/mobile", (req, res) => {
  Cart.find({ category: "mobile" })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/item/laptop", (req, res) => {
  Cart.find({ category: "laptop" })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/post/:id", requireLogin, (req, res) => {
  Cart.findById(req.params.id)
    .populate("postedBy", "_id name s")
    .populate("comments.postedBy", "_id name")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", requireLogin, (req, res) => {
  Cart.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }

      post
        .remove()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
router.post("/createItem", (req, res) => {
  const {
    title,
    price,
    size,
    desc,
    url,
    category,
    displaySize,
    color,
    ram,
    storage,
    battery,
  } = req.body;

  if (!title || !price || !desc) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }

  const cart = new Cart({
    title,
    price,
    size,
    desc,
    category,
    image: url,
    displaySize,
    color,
    ram,
    storage,
    battery,
  });
  cart
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/comment/:id", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Cart.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name ")
    .populate("postedBy", "_id name ")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
router.put("/sell", requireLogin, (req, res) => {
  console.log(req.user._id);
  Cart.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { sells: req.user._id },
    },
    {
      new: true,
    }
  )

    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
router.put("/review/:id", requireLogin, (req, res) => {
  const review = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Cart.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  )
    .populate("reviews.postedBy", "_id name ")
    .populate("postedBy", "_id name ")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.post("/charges", (req, res) => {
  const { product, token } = req.body;
  const idempontencyKey = Math.floor(Math.random() * 10000000);
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))

    .catch((err) => console.log(err));
});

module.exports = router;
