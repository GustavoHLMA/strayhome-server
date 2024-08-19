import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';

import {
  UserRepository,
  TokenRepository,
  CookieRepository,
} from '../repositories';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          message: 'Invalid credentials.',
        });
      }

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return res.status(400).json({
          message: 'Invalid credentials.',
        });
      }

      const accessToken = TokenRepository.generateAccessToken(user.id, '60s');
      const refreshToken = TokenRepository.generateRefreshToken(user.id, '5d');

      CookieRepository.setCookie(res, 'refresh_token', refreshToken);

      const { password: _, ...loggedUser } = user;

      return res.status(200).json({
        message: 'User logged',
        data: {
          loggedUser,
          accessToken,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        delete req.headers.authorization;

        return res.status(401).json({
          message: 'Invalid token',
        });
      }

      const decodedRefreshToken =
        TokenRepository.verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        delete req.headers.authorization;

        return res.status(401).json({
          message: 'Invalid token',
        });
      }

      const user = await UserRepository.findById(decodedRefreshToken.id);

      if (!user) {
        return res.status(400).json({
          message: 'User not found',
        });
      }

      CookieRepository.clearCookies(res, 'refresh_token');

      const newRefreshToken = TokenRepository.generateRefreshToken(
        user.id,
        '1d',
      );
      const accessToken = TokenRepository.generateAccessToken(user.id, '30s');

      CookieRepository.setCookie(res, 'refresh_token', newRefreshToken);

      const { password: _, ...loggedUser } = user;

      return res.status(200).json({
        message: 'Token refreshed',
        data: {
          loggedUser,
          accessToken,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      CookieRepository.clearCookies(res, 'refresh_token');
      delete req.headers.authorization;

      return res.status(200).json({
        message: 'User logged out',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new LoginController();
