import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1707681560418 } from 'src/migrations/1707681560418-CreateCoursesTable';
import { CreateTagsTable1707751098810 } from 'src/migrations/1707751098810-CreateTagsTable';
import { CreateCoursesTagsTable1707752562176 } from 'src/migrations/1707752562176-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1707758305453 } from 'src/migrations/1707758305453-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1707758958998 } from 'src/migrations/1707758958998-AddTagsIdToCoursesTagsTable';
import { Course } from 'src/courses/entites/courses.entity';
import { Tag } from 'src/courses/entites/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1707681560418,
    CreateTagsTable1707751098810,
    CreateCoursesTagsTable1707752562176,
    AddCoursesIdToCoursesTagsTable1707758305453,
    AddTagsIdToCoursesTagsTable1707758958998,
  ],
});
