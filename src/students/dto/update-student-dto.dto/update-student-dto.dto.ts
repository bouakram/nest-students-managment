import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDto } from "../create-student-dto.dto/create-student-dto.dto";

export class UpdateStudentDto extends PartialType(CreateStudentDto) { }
