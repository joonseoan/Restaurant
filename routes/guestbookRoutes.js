const _ = require("lodash");

const { Guests } = require("../models/guests");
// const { GuestLogin } = require("../models/guestLogin");

const { ObjectID } = require("mongodb");
require("../db/mongoose");

module.exports = app => {
  app.post("/guests", (req, res) => {
    const body = _.pick(req.body, [
      "food",
      "like",
      "dislike",
      "title",
      "comments",
      "email",
      "password",
      "servDislike",
      "servComments",
      "telephone"
    ]);

    if (body.title && body.comments && body.email && body.password) {
      const date = new Date();
      const vancouverTime = new Date(date.getTime() - 10800000);

      if (req.body.city !== "Vancouver") {
        body.visitedAt = `(Date: ${date.toDateString()}, Time: ${date.toLocaleTimeString()})`;
      } else {
        body.visitedAt = `(Date: ${vancouverTime.toDateString()}, Time: ${vancouverTime.toLocaleTimeString()})`;
      }

      body.city = req.body.city;
    }

    new Guests(body).save().then(
      result => {
        res.send(result);
      },
      err => {
        res.status(400).send(err);
      }
    );
  });

  app.get("/guests", (req, res) => {
    Guests.find({})
      .then(list => {
        res.send({ list });
      })
      .catch(err => res.status(400).send(err));
  });

  app.get("/guests/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    Guests.findById(id)
      .then(post => {
        if (!post) return res.status(404).send();

        res.send({ post });
      })
      .catch(err => res.status(400).send("post_fail"));
  });

  app.delete("/guests/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(404).send();

    Guests.findByIdAndRemove(id)
      .then(post => {
        if (!post) return res.status(404).send();

        res.send({ post });
      })
      .catch(err => {
        res.status(400).send(err);
      });

    // GuestLogin.findByIdAndRemove(id)
    //   .then(post => {
    //     if (!post) return res.status(404).send();

    //     res.send({ post });
    //   })
    //   .catch(err => {
    //     res.status(400).send(err);
    //   });
  });

  /* Try on this after 2nd project
      app.patch('/guests/:id', (req, res) => {

          const id = req.params.id;

          const body = _.pick(req.body, [ 'food', 'like', 'dislike', 'title', 'comments', 'email', 'password',
                  'servDislike', 'servComments', 'telephone' ]);

          if(!ObjectID.isValid(id)) return res.status(404).send();

          if( body.title && body.comments && body.password && body.email) {

              // I gotta change it for Vancouver.
              const estTime = new Date();

              body.visitedAt = estTime.setHours(estTime.getHours() + estTime.getTimezoneOffset()/60 - 8);

          }

          // For patch to be validated, put "runValidators : true"
          Guests.findOneAndUpdate( { _id : id }, { $set : body }, { new: true }).then (updated => {

                  if(!updated) return res.status(404).send();

                  res.send({ updated });

          }).catch(err => res.status(400).send());

      });

      */

  app.post("/guests/login", async (req, res) => {
    // const { email, password } = req.body;

    // const guest = await Guests.findByCredentials(email, password);

    // console.log("guest", guest);

    // if (guest === "no_email") {
    //   res.send(guest);
    //   return;
    // }

    // if (!guest) return res.send("no_email"); // Promise.reject();

    // res.send(guest);

    try {
      const body = _.pick(req.body, ["email", "password"]);

      const guest = await Guests.findByCredentials(body.email, body.password);

      console.log(guest);

      res.send(guest);
      // const token = await user.generateAuthToken();

      // res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send();
    }

    // GuestLogin.remove()

    // .then(guest => {
    //   console.log("guest: ", guest);

    // if (!guest) return Promise.reject();

    // GuestLogin.remove({}).then(() => {
    //   GuestLogin.insertMany(guest);
    // });

    // // console.log("guest: ", guest);

    // res.send(guest);
    //     })
    //     .catch(err => res.status(400).send());
  });

  // app.get("/loginGuestbooks", (req, res) => {
  //   GuestLogin.find({})
  //     .then(guestbooks => {
  //       //if (guestbooks.length === 0) return;
  //       console.log("guestbooks(loginGuestbooks): ", guestbooks);
  //       res.send({ guestbooks });
  //     })
  //     .catch(err => res.status(400).send(err));
  // });
};
