import { Module } from "@nestjs/common";
import { databaseProvider } from "src/providers/database.providers";

@Module({
    providers: [...databaseProvider],
    exports: [...databaseProvider],
})
export class DatabasesModule {};