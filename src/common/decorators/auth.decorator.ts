import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

export function Auth(role:Role){
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard,RolesGuard)
    )
}