// these are the rules what we need for the specific validation
import { IsObject, IsNotEmptyObject, IsString, IsOptional, IsIn } from 'class-validator';
import { SUPPORTED_MODEL_NAMES } from '../../config/ai-models.config';



// This is the main DTO that represents the entire request body.
// so request bodies have to follow these rules
export class ExecuteTemplateDto {
    @IsObject({ message: 'placeholders must be an object.' })
    @IsNotEmptyObject({}, { message: 'placeholders object cannot be empty.' })
    placeholders!: object;
    @IsString()
    @IsIn(SUPPORTED_MODEL_NAMES, { message: 'The provided model is not supported.' })
    @IsOptional() // This makes the 'model' field optional.
    model?: string;// The '?' also marks it as optional in TypeScript.
}