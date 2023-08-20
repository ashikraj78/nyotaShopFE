export const paymentService = {
  createSession,
  verifyPayment,
};
const backEndURI = process.env.NEXT_PUBLIC_SERVER_SIDE_URI;
async function createSession(data) {
  try {
    const response = await fetch(`${backEndURI}/razorpay/createSession`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from server.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}
async function verifyPayment(data) {
  try {
    const response = await fetch(`${backEndURI}/razorpay/verifyPayment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch payment data from server.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}
