function createCharge(chargeAmount, tranferObject) {

  // Create a Charge:
  stripe.charges.create({
    amount: 10000,
    currency: "hkd",
    source: "tok_visa",
    transfer_group: "{ORDER10}",
  }).then(function (charge) {
    // asynchronously called
  });

  // Create a Transfer to the connected account (later):
  stripe.transfers.create({
    amount: 7000,
    currency: "hkd",
    destination: "{CONNECTED_STRIPE_ACCOUNT_ID}",
    transfer_group: "{ORDER10}",
  }).then(function (transfer) {
    // asynchronously called
  });

  // Create a second Transfer to another connected account (later):
  stripe.transfers.create({
    amount: 2000,
    currency: "hkd",
    destination: "{OTHER_CONNECTED_STRIPE_ACCOUNT_ID}",
    transfer_group: "{ORDER10}",
  }).then(function (second_transfer) {
    // asynchronously called
  });
}
