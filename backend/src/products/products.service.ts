import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const created = new this.productModel(dto);
    return created.save();
  }

  async findAll(params?: { q?: string; page?: number; limit?: number }): Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
  }> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 20));
    const skip = (page - 1) * limit;

    const filter: FilterQuery<ProductDocument> = {};
    if (params?.q) {
      const regex = new RegExp(params.q, 'i');
      filter.$or = [{ titre: regex }, { description: regex }];
    }

    const [data, total] = await Promise.all([
      this.productModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(filter),
    ]);

    return { data, page, limit, total };
  }

  async findOne(id: string): Promise<Product> {
    const doc = await this.productModel.findById(id).exec();
    if (!doc) throw new NotFoundException(`Product ${id} not found`);
    return doc;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!updated) throw new NotFoundException(`Product ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.productModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`Product ${id} not found`);
  }
}
