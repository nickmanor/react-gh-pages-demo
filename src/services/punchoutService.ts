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
    totalCost: 50,
    items: <OrderItem[]>
      [
      <OrderItem>{
          qty: 1,
          productCode: "123456",
          unitPrice: 50,
          unitOfMeasure: "EA",
          description: "hello world",
          classification: "8675309",
          manufacturerName: "bob"
      }
      ]    
  }

  api.post(`/session/${id}/order`, order)
    .then((response) => {
      console.log(response.data);

      var bodyFormData = new FormData();
      bodyFormData.append("cxml-urlencoded", response.data.message);

      api.postForm(response.data.returnUrl, bodyFormData);

    })

}
