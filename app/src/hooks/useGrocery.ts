import { useMutation, useQuery } from '@tanstack/react-query'

import { createGroceryItem, getGroceryList } from '@services/grocery'
import { queryClient } from '@utils/client'




export const useGroceryList = (params?: GroceryListParams, enabled = true) => {
  return useQuery({
    queryKey: ['groceryList' , params],
    queryFn: () => getGroceryList({ ...params }),
    enabled,
  })
}

export const useCreateGrocery = () => {
  return useMutation({
    mutationKey: ['createGrocery'],
    mutationFn: (groceryItem: GroceryFormItem) => createGroceryItem(groceryItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}
