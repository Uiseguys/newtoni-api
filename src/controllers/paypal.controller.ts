//import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {inject} from '@loopback/context';
//import {Order} from '../models';
import {AuthenticationBindings} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
//import {OrderRepository} from '../repositories';
import axios from 'axios';
import * as base64 from 'base-64';

interface ItemInterface {
  name: string;
  description: string;
  quantity: string;
  //category: string,
  price: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
  tax: {
    currency_code: string;
    value: string;
  };
  sku: string;
}

interface OrderInterface {
  total: number;
  items: Array<ItemInterface>;
  subtotal: number;
}

interface OrderCaptureInterface {
  orderID: string;
  payerID: string;
  requestID: string;
  items: Array<ItemInterface>;
}

export class PaypalController {
  private client: string;
  private secret: string;
  private paypalApi: string;
  private paypalOauthApi: string;
  private paypalShippingRate: string;
  private paypalCurrencyCode: string;
  private encodedClientSecret: string;
  private getToken: Function;
  constructor(
    //@repository(OrderRepository)
    //public orderRepository: OrderRepository,
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: UserProfile,
  ) {
    this.client = process.env.PAYPAL_CLIENT as string;
    this.secret = process.env.PAYPAL_SECRET as string;
    this.paypalApi = process.env.PAYPAL_API as string;
    this.paypalOauthApi = process.env.PAYPAL_OAUTH_API as string;
    this.paypalShippingRate = process.env.PAYPAL_SHIPPING_RATE as string;
    this.paypalCurrencyCode = process.env.PAYPAL_CURRENCY_CODE as string;
    this.encodedClientSecret = base64.encode(`${this.client}:${this.secret}`);
    this.getToken = (api: string, encoding: string) =>
      axios
        .post(api, `grant_type=client_credentials`, {
          headers: {
            Authorization: `Basic ${encoding}`,
          },
        })
        .then(res => res.data['access_token']);
  }

  @post('/paypal/create-order', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async createOrder(
    @requestBody({
      content: {
        'application/json': {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    })
    order: OrderInterface,
  ): Promise<object | void | Error> {
    const token = await this.getToken(
      this.paypalOauthApi,
      this.encodedClientSecret,
    );
    return axios
      .post(
        `${this.paypalApi}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: this.paypalCurrencyCode,
                value: order.total,
                breakdown: {
                  item_total: {
                    currency_code: this.paypalCurrencyCode,
                    value: order.subtotal,
                  },
                  shipping: {
                    currency_code: this.paypalCurrencyCode,
                    value: this.paypalShippingRate,
                  },
                  handling: {
                    currency_code: this.paypalCurrencyCode,
                    value: '0.00',
                  },
                  tax_total: {
                    currency_code: this.paypalCurrencyCode,
                    value: '0.00',
                  },
                  shipping_discount: {
                    currency_code: this.paypalCurrencyCode,
                    value: '0.00',
                  },
                },
              },
              items: order.items,
            },
          ],
          appplication_context: {
            return_url: 'https://newtoni-site.netlify.app/checkout',
            cancel_url: 'https://newtoni-site.netlify.app/checkout',
          },
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        return {id: res.data.id};
      })
      .catch(err => {
        console.error(err.response.data);
        return {status: 500};
      });
  }

  @post('paypal/capture-order', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async captureOrder(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object'},
        },
      },
    })
    order: OrderCaptureInterface,
  ): Promise<object | void | Error> {
    const token = await this.getToken(
      this.paypalOauthApi,
      this.encodedClientSecret,
    );
    return axios
      .post(
        `${this.paypalApi}/v2/checkout/orders/${order.orderID}/capture`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Paypal-Request-Id': order.requestID,
          },
        },
      )
      .then(async res => {
        //const orderObject: Partial<Order> = {
        //type: 'PAYPAL',
        //email: res.data.payer.email_address,
        //shipping: res.data.purchase_units[0].shipping,
        //total: res.data.purchase_units[0].payments.captures[0].amount.value,
        //details: {...res.data, cart_items: order.items},
        //delivery_status: 'PACKAGING',
        //};
        //await this.orderRepository.create(orderObject);
        return {status: 'completed'};
      })
      .catch(err => {
        //console.error(err.response.data);
        console.error(err);
        return {status: 500};
      });
  }
}
