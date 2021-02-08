import {Images} from "../theme";

export interface Shop {
  id?: string,
  name?: string,
  type?: string,
  phone?: string,
  coords?: {
    latitude?: number,
    longitude?: number
  },
  like?: boolean,
}

export enum TypeShop {
  FOOD = "Food",
  CLOTHES = "Clothes",
  SHOES = "Shoes",
  SPORT = "Sport",
  OTHER = "Other"
}

export enum TypeTask {
  GEOFENCING_TASK = "background-geofencing-task",
}

export const getAvatarShop = (type: any) => {
  switch (type) {
    case TypeShop.FOOD:
      return Images.foodShop;
    case TypeShop.CLOTHES:
      return Images.clothesShop;
    case TypeShop.SHOES:
      return Images.shoesShop;
    case TypeShop.SPORT:
      return Images.sportShop;
    default:
      return Images.otherShop;
  }
}

