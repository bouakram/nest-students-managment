import { CreateStudentDto } from './dto/create-student-dto.dto/create-student-dto.dto';
import { UpdateStudentDto } from './dto/update-student-dto.dto/update-student-dto.dto';
import { StudentsService } from './students.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get()
    findAllStudent() {
        return this.studentsService.findAll()
    }

    @Get(':id')
    findOneStudent(@Param('id') id: number) {
        return this.studentsService.findOne(id)
    }

    @Post()
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.create(createStudentDto)
    }

    @Patch('id')
    updateStudent(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentsService.update(id, updateStudentDto)
    }

    @Delete('id')
    deleteStudent(@Param('id') id: number) {
        return this.studentsService.remove(id)
    }
}
