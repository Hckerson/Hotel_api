import "dotenv/config";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

declare const module: any;
async function bootstrap() {
  var corsOptions = {
    origin: [
      "http://localhost:3000",
      "https://popup-9wmd.onrender.com",
      "https://0c85208e52db.ngrok-free.app",
    ],
    credentials: true, // allow cookies or Authorization headers
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  const config = new DocumentBuilder()
    .setTitle("Auth API")
    .setDescription("The authentication endpoints")
    .setVersion("1.0")
    .addCookieAuth("sessionId") // optional
    .build();
  app.enableCors(corsOptions);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
