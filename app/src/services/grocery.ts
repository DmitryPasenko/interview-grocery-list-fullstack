import ky from 'ky'

import {env} from '@constants/env'
import {toStringParams} from "@utils/utils";


export const getGroceryList = async (params: GroceryListParams = {}): Promise<PaginatedResponse<GroceryItem>> => {
  const { page = 1, pageSize = 10, ...otherParams } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...toStringParams(otherParams),
  });

  return await ky.get(`${env.API_URL}/grocery`, {searchParams}).json<PaginatedResponse<GroceryItem>>();
}

export const createGroceryItem = async (groceryItem: GroceryFormItem) => {
  const response = await ky.post(`${env.API_URL}/grocery`, { json: groceryItem }).json<{ data: GroceryItem }>()

  return response.data
}
