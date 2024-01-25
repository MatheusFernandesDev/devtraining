import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  // GET /courses - Retorna a lista de cursos
  @Get()
  getCourses() {
    return [
      { id: 1, name: 'Curso de NodeJS' },
      { id: 2, name: 'Curso de ReactJS' },
    ];
  }
}
