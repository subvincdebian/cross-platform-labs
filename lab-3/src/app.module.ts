import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BookingsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        path: '/',
        context: async ({ req }) => {
          const authHeader = req?.headers?.authorization || '';
          let user = null;
          if (authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7).trim();
            user = await authService.getUserFromToken(token);
          }
          return { req, user };
        },
      }),
    }),
  ],
})
export class AppModule {}
