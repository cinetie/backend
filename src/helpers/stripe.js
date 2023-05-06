import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomer = async (email) => {
  const customer = await stripe.customers.create({ email });
  return customer;
};

export const getCustomer = async (id) => {
  const customer = await stripe.customers.retrieve(id);
  return customer;
};
