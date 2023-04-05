const users = [
    { username: `user1`, email: `user1@email.com` },
    { username: `user2`, email: `user2@email.com` } 
];

const getUser = (username) => {
    return new Promise((resolve, reject) => {
        // get user data by username from users array
            const new_user = users.find(new_user => new_user.username == username);
            if (new_user) {
                resolve(new_user);
            }
            else {
                reject(`The User is not present in the database`);
            }
        });
}

getUser('user1')
    .then(user => {
    console.log(user);
})
.catch(error => {
console.error(error);
});

const getUsers = (userNames) => {
// get all users for usernames passed as argument
    const new_userData = users.filter((user) => userNames.includes(user.username));
    return new_userData;
};

const main = () => {
    const userNames = [`user1`, `user2`];
    const users = getUsers(userNames);
    console.log(users);
};

main();