import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomer = async (email) => {
  const customer = await stripe.customers.create({
    email,
  });
  return customer;
};

export const getCustomer = async (id) => {
  const customer = await stripe.customers.retrieve(id);
  return customer;
};

export const createSubscription = async (customerId, priceId) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });
  return subscription;
};

export const getSubscription = async (id) => {
  const subscription = await stripe.subscriptions.retrieve(id);
  return subscription;
};

export const getProduct = async (id) => {
  const product = await stripe.products.retrieve(id);
  return product;
};
