const user = {
  id: 1,
  name: "David",
};
const admin = {
  id: 2,
  name: "Jame",
};

function getAccount(successCallback, failedCallback) {
  if (user) {
    successCallback(user);
  } else if (admin) {
    successCallback(admin);
  } else {
    failedCallback("Account not found!!!");
  }
}

getAccount(logAccount, (error) => console.log(error));

function logAccount(user, admin) {
  if (user) { console.log("user: ", user) };
  if (admin) { console.log("admin: ", admin) };
}