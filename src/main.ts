import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*", // Allow all origins (for development)
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
    });

    await app.listen(3000);
    console.log("Server running on http://localhost:3000");
}
bootstrap();
