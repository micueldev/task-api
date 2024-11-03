import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FindTaskUseCase } from '../../application/use-cases/find-task.use-case';
import { TaskResponseDto } from '../dtos/response/task-response.dto';
import { TaskCriteria } from '../../domain/task-criteria';
import { CreateTaskBodyDto } from '../dtos/request/create-task-body.dto';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { UpdateTaskBodyDto } from '../dtos/request/update-task-body.dto';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { SearchTasksUseCase } from '../../application/use-cases/search-tasks.use-case';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly searchTasksUseCase: SearchTasksUseCase,
    private readonly findTaskUseCase: FindTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async search(): Promise<TaskResponseDto[]> {
    const criteria = TaskCriteria.createEmpty();
    const tasks = await this.searchTasksUseCase.run({ criteria });
    return tasks.map((taks) => taks.toPrimitives());
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) taskId: string,
  ): Promise<TaskResponseDto> {
    const criteria = TaskCriteria.createById(taskId);
    const task = await this.findTaskUseCase.run({ criteria });
    return { ...task.toPrimitives() };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTaskBody: CreateTaskBodyDto): Promise<void> {
    return this.createTaskUseCase.run(createTaskBody);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() updateTaskBody: UpdateTaskBodyDto,
  ): Promise<void> {
    return this.updateTaskUseCase.run({ ...updateTaskBody, id: taskId });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) taskId: string): Promise<void> {
    return this.deleteTaskUseCase.run({ taskId });
  }
}
