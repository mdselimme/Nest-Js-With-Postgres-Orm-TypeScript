import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) { };
    async createStudent(student: Partial<Student>): Promise<Student> {
        return this.studentRepository.save(student);
    };

    async findAllStudent(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async findById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) {
            throw new Error("Student not found.");
        }
        return student;
    }

    async updateById(id: number, data: Partial<Student>): Promise<Student> {
        await this.studentRepository.update(id, data);
        return this.findById(id);
    }

    async deleteById(id: number): Promise<{ affected?: number }> {
        const result = await this.studentRepository.delete(id);
        return { affected: result.affected || undefined };
    }
}
