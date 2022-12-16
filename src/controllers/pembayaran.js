const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-uyRCzPSdzjsIRxIoJ1uIaTY7",
  clientKey: "SB-Mid-client-Dh04q8xxSg1Q9nqh",
});

exports.transaction = async (req, res, next) => {
  const { total } = req.body;
  let parameter = {
    transaction_details: {
      order_id: `transaction-${Date.now()}`,
      gross_amount: total,
    },
    credit_card: {
      secure: true,
    },
  };

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;

      // transaction redirect url
      let transactionRedirectUrl = transaction.redirect_url;

      res.status(200).json({
        transactionToken,
        transactionRedirectUrl,
      });
    })
    .catch((e) => {
      console.log("Error occured:", e.message);
    });
};

exports.getStatus = (req, res, next) => {
  console.log(`rincian => ${JSON.stringify(req.body)}`);
  const { rincian } = req.body;
  snap.transaction.notification(rincian).then((statusResponse) => {
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    res.status(200).json({
      status: transactionStatus,
    });
    // Sample transactionStatus handling logic

    // if (transactionStatus == "capture") {
    //   if (fraudStatus == "challenge") {
    //     console.log("challenge");
    //   } else if (fraudStatus == "accept") {
    //     console.log("accept");
    //   }
    // } else if (transactionStatus == "settlement") {
    //   // TODO set transaction status on your databaase to 'success'
    //   console.log("settlement");
    // } else if (transactionStatus == "deny") {
    //   // TODO you can ignore 'deny', because most of the time it allows payment retries
    //   // and later can become success
    //   console.log("deny");
    // } else if (transactionStatus == "cancel" || transactionStatus == "expire") {
    //   // TODO set transaction status on your databaase to 'failure'
    //   console.log("cancel");
    // } else if (transactionStatus == "pending") {
    //   // TODO set transaction status on your databaase to 'pending' / waiting payment
    //   console.log("pending");
    // }
  });
};
