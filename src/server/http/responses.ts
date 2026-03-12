import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AppError } from "@/server/errors/app-error";

export function apiSuccess<T>(data: T, init?: { status?: number; meta?: Record<string, unknown> }) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: init?.meta,
    },
    { status: init?.status ?? 200 }
  );
}

export function apiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "The request payload is invalid.",
          details: error.flatten(),
        },
      },
      { status: 400 }
    );
  }

  console.error(error);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
      },
    },
    { status: 500 }
  );
}
