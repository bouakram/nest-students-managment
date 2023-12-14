import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto.dto/create-student-dto.dto';
import { UpdateStudentDto } from './dto/update-student-dto.dto/update-student-dto.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) { }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find({
            relations: ['courses']
        })
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
        const courses = await Promise.all(
            createStudentDto.courses.map(x => this.preloadCourseByName(x))
        )

        const student = this.studentRepository.create({
            ...createStudentDto,
            courses
        })

        return this.studentRepository.save(student)
    }

    async update(id: number, updateStudentDto: UpdateStudentDto) {
        const courses = updateStudentDto.courses && await Promise.all(
            updateStudentDto.courses.map(x => this.preloadCourseByName(x))
        )

        const updateStudent = await this.studentRepository.preload({
            id: id,
            ...updateStudentDto,
            courses
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

    private async preloadCourseByName(name: string): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { name }
        })

        if (name) {
            return course
        }

        this.courseRepository.create({ name })
    }
}
