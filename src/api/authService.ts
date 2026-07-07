import apiClient from './client'
import { PlayerStats, Achievement } from '../types/game'

export interface AuthResponse {
  token: string
  player: PlayerStats
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

class AuthService {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  }

  async logout(): Promise<void> {
    localStorage.removeItem('authToken')
    localStorage.removeItem('playerData')
  }

  async getProfile(): Promise<PlayerStats> {
    const response = await apiClient.get<PlayerStats>('/auth/profile')
    return response.data
  }

  async updateProfile(data: Partial<PlayerStats>): Promise<PlayerStats> {
    const response = await apiClient.put<PlayerStats>('/auth/profile', data)
    return response.data
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken')
  }
}

export default new AuthService()
