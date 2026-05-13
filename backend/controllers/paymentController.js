const Stripe = require('stripe');
const Order = require('../models/Order');

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No hay productos en el carrito' });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: req.user._id,
      items: items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'pending',
    });

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleWebhook = async (req, res) => {
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).json({ message: `Webhook error: ${error.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, {
      status: 'paid',
      stripePaymentId: session.payment_intent,
    });
  }

  res.json({ received: true });
};

module.exports = { createCheckoutSession, handleWebhook };