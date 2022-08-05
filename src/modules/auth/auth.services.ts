import config from "config";
import jwt from "jsonwebtoken";
import { User } from "@modules/users/user.model";
import { IJwtObject, IJwtPayload } from "@common/types/jwt.types";
import log from "@providers/logger.provider";
import { Websocket } from "@src/socket";
import { SOCKET_PATHS } from "@common/const/socket.const";

const jwt_secret = config.get<string>("jwt_secret");

export class AuthServices {
	public getToken = (user: User): IJwtObject => {
		const payload: IJwtPayload = {
			sub: user._id!.toString(),
			username: user.username,
			email: user.email,
			name: user.name,
			iat: new Date().getTime(),
			issuer: "grid-momenta.com",
			audience: "grid-momenta.com",
		};

		const expiresIn = "1d";

		try {
			const signedToken = jwt.sign(payload, jwt_secret, { expiresIn });

			return {
				token: signedToken,
				expires: expiresIn,
			};
		} catch (error) {
			log.info(error);
			return {
				token: "",
				expires: "",
			};
		}
	};

	public verifyToken = (token: string): IJwtPayload | undefined => {
		try {
			const payload = jwt.verify(token, jwt_secret) as IJwtPayload;
			return payload;
		} catch (error) {
			log.info(error);
			return undefined;
		}
	};

	public notifyLogin = (email: string): void => {
		log.info("[service] notifyLogin");
		log.info("[socket] Notifying login to socket");

		const io = Websocket.getInstance();
		io.of(SOCKET_PATHS.AUTH).emit("logged_in", { data: { email } });
	};
}

const authService: AuthServices = new AuthServices();

export default authService;
