// import { faker } from '@faker-js/faker';
// import { pool } from './bootstrap';

// function createRandomUser() {
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(), // Normally hash this with bcrypt
//     gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
//     dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
//     phone: faker.phone.number(),
//     profile_picture_url: faker.image.avatar(),
//     bio: faker.lorem.sentence(),
//     is_public: faker.datatype.boolean(1),
//   };
// }

// function createRandomPost(user) {
//   const { id: userId } = user;
//   const target_amount = faker.number.float({ min: 50, max: 1000, fractionDigits: 2 });

//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     content: faker.commerce.productDescription(),
//     likes_count: faker.number.int({ min: 0, max: 10 }),
//     comments_count: faker.number.int({ min: 0, max: 10 }),
//     image_links: faker.helpers.arrayElements(
//       [
//         faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
//         faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
//         faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
//       ],
//       { min: 1, max: 3 },
//     ),
//     status: faker.helpers.arrayElement(['draft', 'published', 'hidden']),
//     type: faker.helpers.arrayElement(['regular', 'fundraising']),
//     title: faker.commerce.productName(),
//     target_amount,
//     raised_amount: target_amount - faker.number.int({ min: 5, max: 45 }),
//     start_at: faker.date.future(),
//     end_at: faker.date.future(),
//   };
// }

// function createRandomComment(userId, postId) {
//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     post_id: postId,
//     content: faker.lorem.sentence(),
//   };
// }

// function createRandomLike(userId, postId) {
//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     post_id: postId,
//   };
// }

// function createRandomFollow(followerId, followingId) {
//   return {
//     id: faker.string.uuid(),
//     follower_id: followerId,
//     following_id: followingId,
//   };
// }

// const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
// const year = ['25', '26', '27', '28', '29', '30'];
// function createRandomMethod(userId) {
//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     provider: faker.finance.creditCardIssuer(),
//     card_last4: faker.finance.accountNumber(4),
//     card_exp_month: month[faker.number.int({ min: 0, max: 11 })],
//     card_exp_year: year[faker.number.int({ min: 0, max: 5 })],
//   };
// }

// enum TransactionStatus {
//   PENDING = 'PENDING',
//   COMPLETED = 'COMPLETED',
// }
// function createRandomTransaction(userId, methodId) {
//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     payment_method_id: methodId,
//     amount: faker.finance.amount({ min: 5, max: 200 }),
//     currency: 'USD',
//     status: faker.helpers.enumValue(TransactionStatus),
//   };
// }

// function createRandomBookmark(userId, postId) {
//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     post_id: postId,
//   };
// }

// enum NotiType {
//   LIKE = 'Like',
//   COMMENT = 'COMMENT',
//   FOLLOW = 'FOLLOW',
//   SYSTEM = 'SYSTEM',
// }
// function createRandomNotification(userId) {
//   return {
//     id: faker.string.uuid(),
//     user_id: userId,
//     message: faker.lorem.sentence(),
//     type: faker.helpers.enumValue(NotiType),
//   };
// }

// export async function populateData(numOfUsers = 20) {
//   try {
//     // Connect to the database
//     await pool.connect();

//     // Generate and insert users
//     console.log('Generating users...');
//     const users = faker.helpers.multiple(createRandomUser, {
//       count: numOfUsers,
//     });

//     // Insert user into the database
//     for (let user of users) {
//       await pool.query(
//         `INSERT INTO users (id, username, email, password, gender, dob, profile_picture_url, bio, is_public)
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
//         [
//           user.id,
//           user.username,
//           user.email,
//           user.password,
//           user.gender,
//           user.dob,
//           user.profile_picture_url,
//           user.bio,
//           user.is_public,
//         ],
//       );
//     }
//     console.log('Users generated.');

//     const postDB = [];

//     // Insert post into the database
//     for (let user of users) {
//       const posts = faker.helpers.multiple(() => createRandomPost(user), {
//         count: faker.number.int({ min: 1, max: 5 }),
//       });

//       for (let post of posts) {
//         await pool.query(
//           `INSERT INTO posts (id, user_id, content, likes_count, comments_count, image_links, status, type, title, target_amount, raised_amount, start_at, end_at)
//            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
//           Object.values(post),
//         );
//         postDB.push(post);
//       }
//       console.log(`Posts generated for the user #${user.id}`);
//     }

//     // Insert comment, like, follow, notification into the database
//     for (let user of users) {
//       const numberOfComment = faker.number.int({ min: 1, max: 15 });
//       for (let i = 0; i < numberOfComment; i++) {
//         const postDBLen = postDB.length;
//         const postId = postDB[faker.number.int({ min: 0, max: postDBLen - 1 })].id;
//         const comments = faker.helpers.multiple(() => createRandomComment(user.id, postId), {
//           count: faker.number.int({ min: 1, max: 2 }),
//         });

//         for (let comment of comments) {
//           await pool.query(
//             `INSERT INTO comments (id, user_id, post_id, content)
//              VALUES ($1, $2, $3, $4)`,
//             Object.values(comment),
//           );
//         }
//         console.log(`Comments generated for the user #${user.id}`);
//       }

//       const numberOfLike = faker.number.int({ min: 1, max: 20 });
//       for (let i = 0; i < numberOfLike; i++) {
//         const postDBLen = postDB.length;
//         const postId = postDB[faker.number.int({ min: 0, max: postDBLen - 1 })].id;
//         const like = createRandomLike(user.id, postId);
//         try {
//           await pool.query(
//             `INSERT INTO likes (id, user_id, post_id) VALUES ($1, $2, $3)`,
//             Object.values(like),
//           );
//         } catch (e) {
//           console.log('No Duplicate Like');
//         }
//         console.log(`Like generated for the user #${user.id} and post #${postId}`);
//       }

//       const numberOfBookmark = faker.number.int({ min: 1, max: 20 });
//       for (let i = 0; i < numberOfBookmark; i++) {
//         const postDBLen = postDB.length;
//         const postId = postDB[faker.number.int({ min: 0, max: postDBLen - 1 })].id;
//         const bookmark = createRandomBookmark(user.id, postId);
//         try {
//           await pool.query(
//             `INSERT INTO bookmarks (id, user_id, post_id) VALUES ($1, $2, $3)`,
//             Object.values(bookmark),
//           );
//         } catch (e) {
//           console.log('No Duplicate Bookmark');
//         }
//         console.log(`Bookmark generated for the user #${user.id} and post #${postId}`);
//       }

//       const numberOfFollow = faker.number.int({ min: 5, max: 15 });
//       for (let i = 0; i < numberOfFollow; i++) {
//         const userDBLen = users.length;
//         const userId = users[faker.number.int({ min: 0, max: userDBLen - 1 })].id;
//         const follow = createRandomFollow(user.id, userId);
//         try {
//           await pool.query(
//             `INSERT INTO follows (id, follower_id, following_id) VALUES ($1, $2, $3)`,
//             Object.values(follow),
//           );
//         } catch (e) {
//           console.log('No Duplicate Follow');
//         }
//         console.log(`Follow generated for the follower #${user.id} and following #${userId}`);
//       }

//       const numberOfNoti = faker.number.int({ min: 1, max: 3 });
//       for (let i = 0; i < numberOfNoti; i++) {
//         const noti = createRandomNotification(user.id);
//         try {
//           await pool.query(
//             `INSERT INTO notifications (id, user_id, message, type) VALUES ($1, $2, $3, $4)`,
//             Object.values(noti),
//           );
//         } catch (e) {
//           console.log('Error creating a notification');
//         }
//         console.log(`Noti generated for the user #${user.id}`);
//       }
//     }

//     // Insert payment method and transaction into the database
//     for (let user of users) {
//       const methods = faker.helpers.multiple(() => createRandomMethod(user.id), {
//         count: faker.number.int({ min: 1, max: 2 }),
//       });

//       for (let method of methods) {
//         await pool.query(
//           `INSERT INTO payment_methods (id, user_id, provider, card_last4, card_exp_month, card_exp_year)
//                VALUES ($1, $2, $3, $4, $5, $6)`,
//           Object.values(method),
//         );
//       }

//       const transactions = faker.helpers.multiple(
//         () => createRandomTransaction(user.id, methods[0].id),
//         {
//           count: faker.number.int({ min: 1, max: 6 }),
//         },
//       );

//       for (let transaction of transactions) {
//         await pool.query(
//           `INSERT INTO transactions (id, user_id, payment_method_id, amount, currency, status)
//                VALUES ($1, $2, $3, $4, $5, $6)`,
//           Object.values(transaction),
//         );
//       }

//       console.log(`Methods and Transactions generated for the user #${user.id}`);
//     }

//     console.log('Database connection closed.');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error generating data:', error);
//   } finally {
//     // Close the database connection
//     await pool.end();
//   }
// }
