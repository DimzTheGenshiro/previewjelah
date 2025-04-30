paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: { value: '10.00' }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Thanks, ' + details.payer.name.given_name + '! Product will be sent to your email.');
      fetch('/send-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: details.payer.name.given_name,
          email: details.payer.email_address
        })
      });
    });
  }
}).render('#paypal-button-container');