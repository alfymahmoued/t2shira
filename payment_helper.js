const axios = require('axios');

const apiKey = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRZNU9UWTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuNGdVMmFlbnRvVXlTemt0UjRrV3htTkJuWEhCU3J2cXVkVVVyTFR1R3NDYmtkMlNENW9JYzlxMUhSdzF6RFJqMkYzUGxLdVpYY0kxWTVuYVJYLWd3NVE='
const integrationId = '2002964'

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
    /* "billing_data": {
         "apartment": "803",
         "email": "claudette09@exa.com",
         "floor": "42",
         "first_name": "Clifford",
         "street": "Ethan Land",
         "building": "8028",
         "phone_number": "+86(8)9135210487",
         "shipping_method": "PKG",
         "postal_code": "01898",
         "city": "Jaskolskiburgh",
         "country": "CR",
         "last_name": "Nicolas",
         "state": "Utah",
         "type": 'plan',
         'user_id': '_u'
     }*/
    return result.data.token
}

async function getHMACByOrderId(token, orderId) {

    console.log('Order ID ' + orderId)
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