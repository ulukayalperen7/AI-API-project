// these are the rules what we need for the specific validation
import { IsObject, IsNotEmptyObject } from 'class-validator';



// This is the main DTO that represents the entire request body.
// so request bodies have to follow these rules
export class ExecuteTemplateDto {
    @IsObject({ message: 'placeholders must be an object.' })
    @IsNotEmptyObject({}, { message: 'placeholders object cannot be empty.' })
    placeholders!: object;
}