const axios = require('axios');

const apiKey = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SndjbTltYVd4bFgzQnJJam94TmprNU5qY3NJbU5zWVhOeklqb2lUV1Z5WTJoaGJuUWlMQ0p1WVcxbElqb2lNVFkxTkRjd01qUTBOQzR4TURFeE1ESWlmUS5GZUJ6aGdPb01KUlVtemswR2xOaTIwQ1FJWW8zc1FzUWo0ZXk0WTVsTEhGejBON3pVcmF4ZUZNVUxNUnNTeUYwU2F5OVFmVnBScXJnSy1mQ0pqNWtqUQ=='
const integrationId = '2203018' //2207182

async function getPaymobToken() {

    const result = await axios
        .post('https://accept.paymob.com/api/auth/tokens', {
            "api_key": apiKey
        })

    return result.data.token
}

async function makeOrder(token, amount) {

    const result = await axios
        .post('https://accept.paymob.com/api/ecommerce/orders', {
            "auth_token": token,
            "amount_cents": amount,
            "currency": "EGP",
        })
    return result.data.id // order id

}

async function paymentKeys(token, orderId, amount, billingData) {

    const result = await axios
        .post('https://accept.paymob.com/api/acceptance/payment_keys', {
            "auth_token": token,
            "amount_cents": amount,
            "currency": "EGP",
            "expiration": 3600,
            "order_id": orderId,
            "integration_id": integrationId,
            "lock_order_when_paid": "false",
            "billing_data": billingData,
        })
    return result.data.token
}

async function getHMACByOrderId(token, orderId) {

    const result = await axios
        .get(`https://accept.paymobsolutions.com/api/acceptance/transactions/${orderId}/hmac_calc`,
            {
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    return result.data.hmac
}

module.exports = {
    getPaymobToken,
    makeOrder,
    paymentKeys,
    getHMACByOrderId,
}