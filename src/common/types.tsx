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
  LOCATION_TASK = "background-location-task",

}