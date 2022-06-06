const axios = require('axios');

const apiKey = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRZNU9UWTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuNGdVMmFlbnRvVXlTemt0UjRrV3htTkJuWEhCU3J2cXVkVVVyTFR1R3NDYmtkMlNENW9JYzlxMUhSdzF6RFJqMkYzUGxLdVpYY0kxWTVuYVJYLWd3NVE='
const integrationId = '2161164'

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
            "billing_data": billingData
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
}/*
'city': '_',
'first_name': '_',
'last_name': '_',
'email': '_',
'apartment': '',
'building': '_',
'floor': '_',
'street': "_",
'phone_number': "_",
'shipping_method': "_",
'postal_code': "_",
'country': "_",
'state': "_",*/

module.exports = {
    getPaymobToken,
    makeOrder,
    paymentKeys,
    getHMACByOrderId,
}