import {
  ADD_TO_CART,
  REMOVE_ITEM,
  FETCH_ITEM,
  ADD_QUANTITY,
  FETCH_ITEMS,
  CLEAR_CART_ITEMS,
  FILTER_ITEM,
  FILTER_ITEM_BY_SIZE,
  CREATE_ITEM,
  ADD_COMMENT,
  CLEAR_ITEM_STATE,
} from "../actions/index";
import { DELETE_PRODUCT, ADD_REVIEW, SELL_ITEM } from "../actions/product";

const initState = {
  items: [
    // {id:1,title:'Winter body',size:'lg', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110},
    // {id:2,title:'Adidas',size:'md', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80},
    // {id:3,title:'Vans',size:'lg', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120},
    // {id:4,title:'White',size:'sm', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260},
    // {id:5,title:'Cropped-sho',size:'sm', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160},
    // {id:6,title:'Blues',size:'sm' ,desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90}
  ],
  addedItems: [],
  total: 0,
  post: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case FETCH_ITEMS:
      return { ...state, items: action.payload };
    case ADD_TO_CART:
      let addedItem = state.items.find((item) => item._id === action.id);
      let exist_item = state.addedItems.find((item) => item._id === action.id);
      if (exist_item) {
        addedItem.quantity += 1;
        return { ...state, total: state.total + addedItem.price };
      } else {
        addedItem.quantity = 1;
        let newTotal = state.total + addedItem.price;
        return {
          ...state,
          total: newTotal,
          addedItems: [...state.addedItems, addedItem],
        };
      }
    case REMOVE_ITEM:
      let addedItems = state.addedItems.find((item) => item._id === action.id);
      console.log(addedItems);
      console.log(typeof addedItems.quantity);

      if (addedItems.quantity === 1) {
        let new_items = state.addedItems.filter(
          (item) => item._id !== action.id
        );

        let newTotal = state.total - addedItems.price;
        console.log(new_items);
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
        };
      } else {
        addedItems.quantity -= 1;
        let newTotal = state.total - addedItems.price;
        return {
          ...state,
          total: newTotal,
          addedItems: [...state.addedItems],
        };
      }
    case ADD_QUANTITY:
      let find_ele = state.addedItems.find((item) => item._id === action.id);
      find_ele.quantity += 1;
      let newTotal = state.total + find_ele.price;
      console.log(state);
      return {
        ...state,
        total: newTotal,
        addedItems: [...state.addedItems],
      };
    case CLEAR_CART_ITEMS:
      return {
        ...state,
        total: 0,
        addedItems: [],
      };
    case FILTER_ITEM:
      if (action.payload !== "") {
        let filteredItem;
        let newState = { ...state };
        filteredItem = newState.items.filter(
          (item) => item.price < action.payload
        );
        return {
          ...state,
          filteredItem,
        };
      } else {
        let filteredItem;
        filteredItem = state.items;
        return {
          ...state,
          filteredItem,
        };
      }
    case FILTER_ITEM_BY_SIZE:
      let filteredItem;
      let newState = { ...state };
      filteredItem = newState.items.filter(
        (item) => item.size === action.payload
      );
      return {
        ...state,
        filteredItem,
      };
    case FETCH_ITEM:
      return { ...state, getItem: action.payload };
    case CLEAR_ITEM_STATE:
      return { ...state, getItem: action.payload };
    case ADD_COMMENT:
    case ADD_REVIEW:
    case SELL_ITEM:
      return { ...state, getItem: { ...state.getItem, ...action.payload } };

    default:
      return state;
  }
};
