import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true, maxlength: 255 })
  name: string; // Nom du département

  @Prop({ maxlength: 500 })
  description?: string; // Description du département

  @Prop({ type: Boolean, default: true })
  isActive: boolean; // Département actif ou non
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);

// Index pour améliorer les performances
DepartmentSchema.index({ name: 1 });
DepartmentSchema.index({ isActive: 1 });
