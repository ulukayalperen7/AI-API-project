// these are the rules what we need for the specific validation
import { IsObject, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
// To properly transform the incoming object.
import { Type } from 'class-transformer';

 
/**
 * this class defines the validation rules for the placeholders object.
 * and  it is a dynamic class 
 */
class PlaceholdersDto {
    // The validation here could be more specific if needed.

    // All objects created by this class can have dynamic keys,
    // but all keys and values must have string 
    [key: string]: string;
}

// This is the main DTO that represents the entire request body.
// so request bodies have to follow these rules
export class ExecuteTemplateDto {
    @IsObject({ message: 'placeholders must be an object.' })
    @IsNotEmptyObject({}, { message: 'placeholders object cannot be empty.' })
    @ValidateNested() // This tells the validator to also validate the inner object (PlaceholdersDto).
    @Type(() => PlaceholdersDto) // This tells class-transformer to use our PlaceholdersDto class.
    placeholders!: PlaceholdersDto;// The '!' tells TypeScript: "Trust me, this property will be initialized.
}