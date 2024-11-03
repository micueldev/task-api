import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { FindTaskUseCase } from "../../application/use-cases/find-task.use-case";
import { TaskResponseDto } from "../dtos/response/task-response.dto";
import { TaskCriteria } from "../../domain/task-criteria";

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly findTaskUseCase: FindTaskUseCase,
  ) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) taskId: string,
  ): Promise<TaskResponseDto> {
    const criteria = TaskCriteria.createById(taskId)
    const task = await this.findTaskUseCase.run({criteria});
    return {...task.toPrimitives()};
  }
}
