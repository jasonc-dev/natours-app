import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51IUCaIKOgKA4e07YoIVxyjoFJ3qFVGK82dNgcgMvNU71RJ4XWslbTL64I77QyqQWk6i9Wi6dbqVzCkEK4FKxm1Vx00EL09FUp5'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
