# Firekiq
Sidekiq alternative with Firebase Functions

## How does it work?

### Just add a job to queue collection

```js
db.collection("queue")
  .set({
    worker: "welcomeEmail",
    performAt: Apr 28, 2022, // Timestamp
    status: "scheduled",
    retries: 0,
    options: {
      uid: "chxCogXXXXXX3SClf2bvofKC3",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com"
    }
  })
```

### Create a worker function

```js
const workers = {
  welcomeEmail: async (options) => {
    console.log("Sending welcome email =>", options);

    return {
      success: false, // true / false
      error: "Error sending welcome email" // Optional,
    };
  },
};
```