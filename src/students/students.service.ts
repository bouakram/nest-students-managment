import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto.dto/create-student-dto.dto';
import { UpdateStudentDto } from './dto/update-student-dto.dto/update-student-dto.dto';

@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) { }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find()
    }

    async findOne(id: number): Promise<Student> {
        const student = this.studentRepository.findOne({
            where: { id }
        })
        if (!student) {
            throw new NotFoundException('student not found')
        }
        return student
    }

    async create(createStudentDto: CreateStudentDto) {
        const student = this.studentRepository.create({
            ...createStudentDto
        })

        return this.studentRepository.save(student)
    }

    async update(id: number, updateStudentDto: UpdateStudentDto) {
        const updateStudent = await this.studentRepository.preload({
            id: id,
            ...updateStudentDto
        })

        if (!updateStudent) {
            throw new NotFoundException('student not found')
        }

        return this.studentRepository.save(updateStudent)
    }

    async remove(id: number) {
        const removedStudent = await this.studentRepository.delete(id)

        if (!removedStudent) {
            throw new NotFoundException('student not found')
        }
    }
}
