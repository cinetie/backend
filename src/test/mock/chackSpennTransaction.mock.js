const transaction = {
  status: 200,
  message: "Transaction found",
  data: {
    $id: "1",
    Receiver: {
      $id: "2",
      Name: "Cinetie Store",
      Email: null,
      AccountType: "Spending",
      CustomerGuid: "338341df-d317-46a1-a755-857976d862ce",
      Phone: "+250781250003",
      Picture: "",
    },
    Request: {
      $id: "3",
      Items: [],
      RequestId: "f6034298-e8d8-4f00-94aa-19f5d661af0d",
    },
    Amount: 2969,
    CurrencyId: 9,
    Direction: "In",
    Sender: {
      $id: "4",
      Name: "Cinetie Customer",
      Email: null,
      AccountType: "",
      CustomerGuid: "2dde3a70-534d-4405-8af6-16a3fcdda6a4",
      Phone: "+250781250004",
      Picture: "",
    },
    Status: "Approved",
    TimestampCompleted: "2020-12-07T14:30:26.223",
    TimestampCreated: "2020-12-07T14:30:26.223",
    TransactionId: "f6034298-e8d8-4f00-94aa-19f5d661af0d",
    TransactionType: "Payment",
    Message: "Cinetie subscription payment",
  },
};

export default transaction;
