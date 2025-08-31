import "dotenv/config";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { ValidationPipeOptions , BadRequestException} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder , SwaggerDocumentOptions} from "@nestjs/swagger";

declare const module: any;
async function bootstrap() {
  var corsOptions = {
    origin: [
      "http://localhost:3000",
      "https://paystark.loca.lt",
      "https://popup-9wmd.onrender.com",
      "https://b1ea76dfe7f9.ngrok-free.app",
    ],
    credentials: true, // allow cookies or Authorization headers
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const opts: ValidationPipeOptions = {
    transform: true,
    exceptionFactory: errs => new BadRequestException(errs),
  }

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle("SerenaHeaven API")
    .setDescription("The authentication endpoints")
    .setVersion("1.0")
    .addCookieAuth("sessionId") // optional
    .build();
  app.enableCors(corsOptions);

  const document = SwaggerModule.createDocument(app, config, options  );

  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
