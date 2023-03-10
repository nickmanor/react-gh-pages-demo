import axios from "axios";
import { ISessionItem, SessionInfo } from "../pages/Start";
import { CartItems } from "../types/CartTypes";

const api = axios.create({
  //baseURL: "https://ulfpunchoutdev.azurewebsites.net/punchout",
  baseURL: "https://test.ulfweb.com/punchout",
});

export const getSession = async (id: string) => {
  const { data } = await api.get(`session/${id}/session`);

  console.log("SessionData", data);

  return data;
};

export const saveCart = async (id: string, items: CartItems) => {
  console.log("Save Cart Items", items);

  api.put(`/cart/${id}`, items);
};

export const getCart = async (id: string): Promise<CartItems> => {
  console.log("Get Cart Items");

  const { data } = await api.get(`/cart/${id}`);
  return data;
};

export class Order implements IOrder {
  totalCost?: number;
  items?: OrderItem[] | undefined;

  constructor(data?: IOrder) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.totalCost = _data["totalCost"];
          if (Array.isArray(_data["items"])) {
              this.items = [] as any;
              for (let item of _data["items"])
                  this.items!.push(OrderItem.fromJS(item));
          }
      }
  }

  static fromJS(data: any): Order {
      data = typeof data === 'object' ? data : {};
      let result = new Order();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["totalCost"] = this.totalCost;
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data;
  }
}

export interface IOrderItem {
  qty?: number;
  productCode?: string | undefined;
  unitPrice?: number;
  description?: string | undefined;
  unitOfMeasure?: string | undefined;
  classification?: string | undefined;
  manufacturerName?: string | undefined;
}

export interface IOrder {
  totalCost?: number;
  items?: OrderItem[] | undefined;
}

export class OrderItem implements IOrderItem {
  qty?: number;
  productCode?: string | undefined;
  unitPrice?: number;
  description?: string | undefined;
  unitOfMeasure?: string | undefined;
  classification?: string | undefined;
  manufacturerName?: string | undefined;

  constructor(data?: IOrderItem) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.qty = _data["qty"];
          this.productCode = _data["productCode"];
          this.unitPrice = _data["unitPrice"];
          this.description = _data["description"];
          this.unitOfMeasure = _data["unitOfMeasure"];
          this.classification = _data["classification"];
          this.manufacturerName = _data["manufacturerName"];
      }
  }

  static fromJS(data: any): OrderItem {
      data = typeof data === 'object' ? data : {};
      let result = new OrderItem();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["qty"] = this.qty;
      data["productCode"] = this.productCode;
      data["unitPrice"] = this.unitPrice;
      data["description"] = this.description;
      data["unitOfMeasure"] = this.unitOfMeasure;
      data["classification"] = this.classification;
      data["manufacturerName"] = this.manufacturerName;
      return data;
  }
}

export const postCart = async (id: string, session: ISessionItem): Promise<any> => {
  console.log("Post Cart");

  const order = <Order>{
    totalCost: 52.50,
    items: <OrderItem[]>
      [
      <OrderItem>{
          qty: 1,
          productCode: "50478",
          unitPrice: 50.00,
          unitOfMeasure: "EA",
          description: "hello worlds",
          classification: "8675309",
          manufacturerName: "bob inc."
      },
      <OrderItem>{
        qty: 2,
        productCode: "867512",
        unitPrice: 1.25,
        unitOfMeasure: "EA",
        description: "Here is a much longer description to see if it rolls to another field.",
        classification: "8675309",
        manufacturerName: "bob inc."
    }
      ]    
  }  

    const res = await api.post(`/session/${id}/order`, order)
    console.log(res.data);

      var bodyFormData = new URLSearchParams();
      bodyFormData.append("cxml-urlencoded", res.data.message);

      // fetch(response.data.returnUrl, { method: 'POST', body: bodyFormData, headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' } })
      //   .then(res => console.log('Success', res))
      //   .catch(error => console.error('Error', error))      

      //api.postForm(response.data.returnUrl, bodyFormData);

      
      
  post(res.data.returnUrl, bodyFormData);
}

export type KeyValuePairNamed = [key: string, value: string] // "key" and "value" labels

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

 function post(path: string, params: URLSearchParams, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

   params.forEach((val, key) => {
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = key;
    hiddenField.value = val;

    console.log("got here", key, val);

    form.appendChild(hiddenField);
   })
   
  document.body.appendChild(form);
  form.submit();
}
