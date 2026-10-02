import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('CyberClubGraphQL');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use('/graphql', (req: any, res: any, next: any) => {
    req.url = '/';
    next();
  });

  const port = 4001;
  await app.listen(port);

  logger.log(`GraphQL API запущено за адресою: http://localhost:${port}/`);
  logger.log(`Apollo Sandbox доступний у браузері за адресою: http://localhost:${port}/`);
}

bootstrap();
