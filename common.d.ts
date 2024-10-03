type User = {
  id: string;
  name: string;
  email: string;
  pictureURL: string | null;
  sub?: string;
  profile: {
    id: string;
    url: string;
  };
  shippingAddress: {
    id: string;
    address: string;
    phone: string;
    country: string;
    zipcode: string;
    city: string;
    state: string;
  }[];
};

type Login = {
  loginUser: {
    token: string;
    user: User;
  };
};

type CreateOrder = {
  createOrder: {
    id: string;
    orderBy: {
      id: string;
      name: string;
      email: string;
    };
  };
};

type GetOrder = {
  id: string;
  orderBy: {
    id: string;
    name: string;
  };
  status: string;
  trackId: string;
  address: string;
  phone: string;
  cart: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productImage: {
      url: string;
    };
  }[];
  discount: number;
  delivery: number;
  tax: number;
  total: number;
  createdAt: string;
  deliveryDate: string;
  shippedDate: string;
  outOfDeliveryDate: string;
};
