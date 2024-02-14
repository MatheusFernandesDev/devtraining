import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entites/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entites/tags.entity';
import { UpdateCourseDto } from './dto/update-course-dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async findAll() {
    return this.courseRepository.find({ relations: ['tags'] });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
