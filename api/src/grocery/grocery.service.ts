import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { FilterGroceryDto } from './dto/filter.dto'
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto'
import { PaginatedResult } from '../common/interfaces'
import { GroceryItem } from '@prisma/client'

@Injectable()
export class GroceryService {
  constructor(private readonly prisma: PrismaService) {}

  async filterGroceries(
    filter: FilterGroceryDto,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedResult<GroceryItem>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const groceries = await this.prisma.groceryItem.findMany({
      where: filter,
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
      skip,
      take,
    })

    const total = await this.prisma.groceryItem.count({ where: filter })
    const totalPages = Math.ceil(total / pageSize)

    return {
      data: groceries,
      page,
      pageSize,
      total,
      totalPages,
    }
  }

  async createGrocery(createGroceryDto: CreateGroceryDto) {
    return this.prisma.groceryItem.create({ data: createGroceryDto })
  }

  async updateGrocery(id: string, updateGroceryDto: UpdateGroceryDto) {
    return this.prisma.groceryItem.update({
      where: { id },
      data: updateGroceryDto,
    })
  }
}
