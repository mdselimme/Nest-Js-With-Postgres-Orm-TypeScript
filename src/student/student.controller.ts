import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { };

    @Post()
    createStudent(@Body() student: Partial<Student>) {
        return this.studentService.createStudent(student);
    }

    @Patch(':id')
    update(@Body() student: Partial<Student>, @Param('id') id: string) {
        return this.studentService.updateById(Number(id), student);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    student() {
        return this.studentService.findAllStudent();
    }

    @Get('/search')
    query(@Query('name') name: string, @Query('age') age: string) {
        return this.studentService.searchStudent({ name, age: Number(age) });
    }

    @Get(':id')
    studentById(@Param('id') id: string) {
        return this.studentService.findById(Number(id));
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.studentService.deleteById(Number(id));
    }

}
