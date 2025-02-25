import { ApiResponse } from "@/model/ApiResponse";
import { Article } from "@/model/Article";
import axios, { AxiosError } from "axios";
import api from '..';
import { ErrorResponse } from '../../model/ErrorReponse';

export const getArticles = async (source?: string, players?: string, limit?: number): Promise<ApiResponse<Article[]>> => {
    const params = new URLSearchParams();

    try {
        if (source) params.append("source", source);
        if (players) params.append("players", players);
        if (limit) params.append("limit", limit.toString());

        const response = await api.get(`/articles?${params.toString()}`);
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}