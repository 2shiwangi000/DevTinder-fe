import { purchaseMembership } from "../../service/premium";

const Premium = () => {
  const handleBuyClick = async (type: string) => {
    await purchaseMembership(type).then((res) => {
      const { keyId, amount, currency, orderId, notes } = res;
      var options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Dev Tinder",
        description: "Connecting developers smarter",
        // image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: location.href,
        prefill: {
          name: notes?.firstName + notes?.lastName,
          email: notes?.email,
          contact: notes?.contact,
        },
        notes: notes,
        theme: {
          color: "#3399cc",
        },
      };
       const rzp =  new window.Razorpay(options);
       rzp.open();
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Upgrade to Premium
          </h1>
          <p className="text-base sm:text-lg text-base-content/70 mt-3">
            Unlock better reach and more visibility 🚀
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Silver Plan */}
          <div className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300">
            <div className="card-body p-6 sm:p-8">
              <h2 className="card-title text-xl sm:text-2xl">💿 Silver</h2>

              <div className="mt-4">
                <p className="text-3xl sm:text-4xl font-bold">
                  ₹99
                  <span className="text-sm font-normal text-base-content/60">
                    /month
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2 text-sm sm:text-base">
                <li>✔ 20 connection requests / day</li>
                <li>✔ View profile visitors</li>
                <li>✔ Basic badge</li>
                <li>✔ Priority support</li>
              </ul>

              <div className="card-actions mt-8">
                <button
                  className="btn btn-outline btn-primary w-full"
                  onClick={() => handleBuyClick("silver")}
                >
                  Choose Silver
                </button>
              </div>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="card bg-base-100 shadow-xl border-2 border-warning relative hover:scale-[1.02] transition-all duration-300">
            <div className="badge badge-warning absolute right-4 top-4">
              Most Popular
            </div>

            <div className="card-body p-6 sm:p-8">
              <h2 className="card-title text-xl sm:text-2xl">🥇 Gold</h2>

              <div className="mt-4">
                <p className="text-3xl sm:text-4xl font-bold">
                  ₹199
                  <span className="text-sm font-normal text-base-content/60">
                    /month
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2 text-sm sm:text-base">
                <li>✔ Unlimited connection requests</li>
                <li>✔ See who liked your profile</li>
                <li>✔ Premium badge</li>
                <li>✔ Boost profile visibility</li>
                <li>✔ 24/7 priority support</li>
              </ul>

              <div className="card-actions mt-8">
                <button
                  className="btn btn-warning w-full"
                  onClick={() => handleBuyClick("gold")}
                >
                  Go Gold 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
