import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";
import { RefreshToken } from "../entity/refresh-token.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entity/user.entity";

@CustomRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
    async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
        const refreshToken = this.create();
        refreshToken.user = user;
        refreshToken.isRevoked = false;
        const expiredAt = new Date();
        expiredAt.setTime(expiredAt.getTime() + ttl);
        refreshToken.expiredAt = expiredAt;

        return await refreshToken.save();
    }
}