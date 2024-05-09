const mysql = require('mysql2');
const fs = require('fs');

// read the JSON file
const data = JSON.parse(fs.readFileSync('product.json'));

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'AnGaRu',
  database: 'products_db',
});

// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
// insert phone data
data.filter(item => item.category === 'Phone').forEach((item) => {
    if (item.product_info.name && item.product_info.price && item.product_info.url && item.image_urls) {
      const price = parseInt(item.product_info.price.toString().replace(/\D/g, ''));
      connection.query(
        `INSERT INTO phone (name, price, url, disk, chip, screen, image_urls, website) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.product_info.name,
          price,
          item.product_info.url,
          item.product_info.disk,
          item.product_info.chip,
          item.product_info.screen,
          item.image_urls,
          item.website,
        ],
        (err, result) => {
          if (err) throw err;
          console.log(`Inserted ${result.affectedRows} row(s) into phone table`);
        }
      );
    }
  });
  
  // insert laptop data
  data.filter(item => item.category === 'Laptop').forEach((item) => {
    if (item.product_info.name && item.product_info.price && item.product_info.url && item.image_urls) {
      const price = parseInt(item.product_info.price.toString().replace(/\D/g, ''));
      connection.query(
        `INSERT INTO laptop (name, price, url, screen, cpu, ram, disk, card, website, image_urls) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.product_info.name,
          price,
          item.product_info.url,
          item.product_info.screen,
          item.product_info.cpu,
          item.product_info.ram,
          item.product_info.disk,
          item.product_info.card,
          item.website,
          item.image_urls,
        ],
        (err, result) => {
          if (err) throw err;
          console.log(`Inserted ${result.affectedRows} row(s) into laptop table`);
        }
      );
    }
  });
  
  // insert mouse data
  data.filter(item => item.category === 'Mouse').forEach((item) => {
    if (item.product_info.name && item.product_info.price && item.product_info.url && item.image_urls) {
      const price = parseInt(item.product_info.price.toString().replace(/\D/g, ''));
      connection.query(
        `INSERT INTO mouse (name, price, url, brand, connect_type, dpi, website, image_urls) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.product_info.name,
          price,
          item.product_info.url,
          item.product_info.brand,
          item.product_info.connect_type,
          item.product_info.dpi,
          item.website,
          item.image_urls,
        ],
        (err, result) => {
          if (err) throw err;
          console.log(`Inserted ${result.affectedRows} row(s) into mouse table`);
        }
      );
    }
  });
  
  // insert screen data
  data.filter(item => item.category === 'Screen').forEach((item) => {
    if (item.product_info.name && item.product_info.price && item.product_info.url && item.image_urls) {
      const price = parseInt(item.product_info.price.toString().replace(/\D/g, ''));
      connection.query(
        `INSERT INTO screen (name, price, url, screen_size, website, image_urls) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          item.product_info.name,
          price,
          item.product_info.url,
          item.product_info.screen_size,
          item.website,
          item.image_urls,
        ],
        (err, result) => {
          if (err) throw err;
          console.log(`Inserted ${result.affectedRows} row(s) into screen table`);
        }
      );
    }
  });
// insert keyboard data
data.filter(item => item.category === 'Keyboard').forEach((item) => {
    if (item.product_info.name && item.product_info.price && item.product_info.url && item.image_urls) {
      const price = parseInt(item.product_info.price.toString().replace(/\D/g, ''));
      connection.query(
      `INSERT INTO keyboard (name, price, url, brand, compatible, connect_type, size, website, image_urls) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.product_info.name,
        price,
        item.product_info.url,
        item.product_info.brand,
        item.product_info.compatible,
        item.product_info.connect_type,
        item.product_info.size,
        item.website,
        item.image_urls,
      ],
      (err, result) => {
        if (err) throw err;
        console.log(`Inserted ${result.affectedRows} row(s) into keyboard table`);
      }
    );
    }
  });
  
  // insert other data
  data.filter(item => item.category === 'Other').forEach((item) => {
    if (item.product_info.name && item.product_info.price && item.product_info.url && item.image_urls) {
      const price = parseInt(item.product_info.price.toString().replace(/\D/g, ''));
      connection.query(
      `INSERT INTO other (name, price, url, website, image_urls) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        item.product_info.name,
        price,
        item.product_info.url,
        item.website,
        item.image_urls,
      ],
      (err, result) => {
        if (err) throw err;
        console.log(`Inserted ${result.affectedRows} row(s) into other table`);
      }
    );
  }
  });    
// close the connection to the database
connection.end((err) => {
if (err) throw err;
console.log('Closed MySQL database connection');
});

