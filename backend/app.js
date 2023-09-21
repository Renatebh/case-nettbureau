const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");

const connection = require("./database/db");
const cors = require("cors");

const hostname = "localhost";
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const {
  validatePostalCode,
} = require("./postalCodeValidation/postalCodeValidation");


app.get("/", (req, res) => {
  res.send("Hello World");
});

const { sendVerificationEmail } = require("./email");

app.post(
  "/api/addData",
  [
    body("name").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("email").notEmpty().isEmail(),
    body("phone").notEmpty().isNumeric(),
    body("address").notEmpty().isString(),
    body("postalCode").notEmpty().isNumeric(),
    body("city").notEmpty().isString(),
  ],
  async (req, res) => {
    const { name, lastName, email, phone, address, postalCode, city } =
      req.body;
    const isValidPostalCode = await validatePostalCode(
      postalCode,
      bringApiKey,
      sendVerificationEmail
    );

    if (!isValidPostalCode) {
      return res.status(400).json({ error: "Invalid postal code" });
    }
    const errors = [];
    if (
      !name ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !postalCode ||
      !city
    ) {
      errors.push("Missing field");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    connection.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      connection.commit((err) => {
        if (err) {
          connection.rollback(() => {
            console.error("Error commiting the transaction:", err);
            return res.status(500).json({ error: "Server error" });
          });
        }
      });

      connection.query(
        "INSERT INTO name (first_name, last_name) VALUES (?, ?)",
        [name, lastName],
        (error, results) => {
          if (error) {
            connection.rollback(() => {
              console.error("Error inserting data into the name table:", error);
              return res.status(500).json({ error: "Server error" });
            });
          }
          const nameId = results.insertId;

          connection.query(
            "INSERT INTO address (street, postal_code, city, name_id) VALUES (?, ?, ?, ?)",
            [address, postalCode, city, nameId],
            (error, results) => {
              if (error) {
                connection.rollback(() => {
                  console.error(
                    "Error inserting data into the address table:",
                    error
                  );
                  return res.status(500).json({ error: "Server error" });
                });
              }

              connection.query(
                "INSERT INTO phone (phone_number, name_id) VALUES (?,?)",
                [phone, nameId],
                (error, results) => {
                  if (error) {
                    connection.rollback(() => {
                      console.error(
                        "Error inserting data into the phone table:",
                        error
                      );
                      return res.status(500).json({ error: "Server error" });
                    });
                  }

                  connection.query(
                    "INSERT INTO email (email_address, name_id) VALUES (?,?)",
                    [email, nameId],
                    (error, results) => {
                      if (error) {
                        connection.rollback(() => {
                          console.error(
                            "Error inserting data into the email table:",
                            error
                          );
                          return res
                            .status(500)
                            .json({ error: "Server error" });
                        });
                      }

                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            console.error(
                              "Error committing the transaction:",
                              err
                            );
                            return res
                              .status(500)
                              .json({ error: "Server error" });
                          });
                        }

                        sendVerificationEmail().catch(console.error);
                        return res.status(200).json({
                          message: "Data has been successfully inserted",
                        });
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  }
);

app.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}`);
});
