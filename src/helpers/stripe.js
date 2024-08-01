import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomer = async (email) => {
  const customer = await stripe.customers.create({
    email,
  });
  console.log(`INFO: STRIPE: CREATE: ${customer.id}`);
  return customer;
};

export const getCustomer = async (id) => {
  const customer = await stripe.customers.retrieve(id);
  console.log(`INFO: STRIPE: GET: ${customer.id}`);
  return customer;
};

export const createSubscription = async (customerId, priceId, useCoupon) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
    coupon: useCoupon ? process.env.STRIPE_PREMIUM_COUPON : undefined,
  });
  return subscription;
};

export const createCheckoutSession = async (customerId, priceId, useCoupon) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
        },
      ],
      discounts: useCoupon
        ? [{ coupon: process.env.STRIPE_PREMIUM_COUPON }]
        : undefined,
      subscription_data: {
        trial_from_plan: true,
        metadata: {
          customer_id: customerId,
        },
      },
      payment_method_options: {
        card: {
          setup_future_usage: "off_session",
        },
      },
      success_url: "https://www.cinetie.com/h/home",
      cancel_url: `${process.env.CANCEL_STRIPE_URL}`,
    });
    return session;
  } catch (error) {
    console.error("Error creating Checkout Session:", error);
    throw new Error("Unable to create checkout session");
  }
};

export const getSubscription = async (id) => {
  const subscription = await stripe.subscriptions.retrieve(id);
  return subscription;
};

export const getProduct = async (id) => {
  const product = await stripe.products.retrieve(id);
  return product;
};

export const updateSubscription = async (id, priceId) => {
  const subscription = await stripe.subscriptions.update(id, {
    items: [{ price: priceId }],
  });
  return subscription;
};

export const getUserSubscriptions = async (customerId) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
  });
  return subscriptions;
};

export const cancelSubscription = async (id) => {
  const subscription = await stripe.subscriptions.del(id);
  return subscription;
};
