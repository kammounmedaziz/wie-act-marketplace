import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  titre: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, min: 0 })
  prix: number;

  // Accept either absolute URL or relative path stored as string
  @Prop({ required: true, trim: true })
  photo: string;

  @Prop({ required: true, min: 0 })
  quantité: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
