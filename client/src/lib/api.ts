//! Using RPC from hono
//@ Importing type from backend
import { type ApiRoutes } from "@server/app";
//@ Importing hono client for RPC
import { hc } from "hono/client";
//@ Creating hono client
const client = hc<ApiRoutes>("/");

export const api = client.api;
