const connection = require("./db");

// Name table
// connection.query(
//   `
//  CREATE TABLE name (
//     name_id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(50) NOT NULL,
//     last_name VARCHAR(50) NOT NULL
//  );
// `,
//   (error, results) => {
//     if (error) {
//       console.log("Error creating name table", error);
//     } else {
//       console.log("Name table created");
//     }
//     connection.end();
//   }
// );

// create address table
// connection.query(
//   `CREATE TABLE address (
//         address_id INT AUTO_INCREMENT PRIMARY KEY,
//         street VARCHAR(100) NOT NULL,
//         postal_code VARCHAR(10) NOT NULL,
//         city VARCHAR(50) NOT NULL,
//         name_id INT,
//         FOREIGN KEY (name_id) REFERENCES name(name_id)
//     );`,
//   (error, results) => {
//     if (error) {
//       console.log("Error creating address table", error);
//     } else {
//       console.log("Address table created");
//     }
//   }
// );

// Create the 'phone' table
// connection.query(
//   `
//  CREATE TABLE phone (
//     phone_id INT AUTO_INCREMENT PRIMARY KEY,
//     phone_number VARCHAR(20) NOT NULL,
//     name_id INT,
//     FOREIGN KEY (name_id) REFERENCES name(name_id)
//  );
// `,
//   (error, results) => {
//     if (error) {
//       console.log("Error creating phone table", error);
//     } else {
//       console.log("Phone table created");
//     }
//   }
// );

// email table
connection.query(
  `
 CREATE TABLE email (
    email_id INT AUTO_INCREMENT PRIMARY KEY,
    email_address VARCHAR(100) NOT NULL,
    name_id INT,
    FOREIGN KEY (name_id) REFERENCES name(name_id)
 );
`,
  (error, results) => {
    if (error) {
      console.log("Error creating email table", error);
    } else {
      console.log("Email table created");
    }
    connection.end();
  }
);
