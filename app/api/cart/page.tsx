<form action="/api/orders" method="post" className="space-y-4">
  <div>
    <label className="block text-sm mb-1 font-medium">Full Name</label>
    <input name="fullName" type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200" />
  </div>

  <div>
    <label className="block text-sm mb-1 font-medium">Address</label>
    <input name="address" type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200" />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm mb-1 font-medium">City</label>
      <input name="city" type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200" />
    </div>
    <div>
      <label className="block text-sm mb-1 font-medium">Postal Code</label>
      <input name="postalCode" type="text" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200" />
    </div>
  </div>

  <div>
    <label className="block text-sm mb-1 font-medium">Phone Number</label>
    <input name="phone" type="tel" required className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200" />
  </div>

  <div>
    <label className="block text-sm mb-2 font-medium">Payment Method</label>
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <input type="radio" name="payment" value="card" required /> Credit / Debit Card
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="payment" value="paypal" /> PayPal
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" name="payment" value="cod" /> Cash on Delivery
      </label>
    </div>
  </div>

  <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
    Place Order
  </button>
</form>
