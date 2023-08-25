import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';

export const Roles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user; // Anggap payload JWT terlampir pada objek user

    return user.roles; // Mengembalikan array peran (role) yang disertakan dalam token JWT
  },
);
