export const paymentService = {
  createSession,
  verifyPayment,
};
async function createSession(data) {
  try {
    const response = await fetch(
      "http://localhost:4000/razorpay/createSession",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );

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
    const response = await fetch(
      "http://localhost:4000/razorpay/verifyPayment",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch payment data from server.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}
