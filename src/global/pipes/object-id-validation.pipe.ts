import {
  ArgumentMetadata,
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (metadata.type === 'param' && !this.isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }

  private isValidObjectId(id: string): boolean {
    const objectIdPattern = /^[a-f0-9]{24}$/i;
    return objectIdPattern.test(id);
  }
}
